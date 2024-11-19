package com.dut.healthme.service.impl;

import com.dut.healthme.common.constant.ErrorMessageConstants;
import com.dut.healthme.common.exception.BadRequestException;
import com.dut.healthme.common.util.CommonUtils;
import com.dut.healthme.dto.request.UpdateCustomerInfoRequest;
import com.dut.healthme.dto.response.AccountInfo;
import com.dut.healthme.dto.response.CustomerInfoResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Customer;
import com.dut.healthme.entity.enums.Gender;
import com.dut.healthme.entity.enums.HealthGoal;
import com.dut.healthme.repository.AccountsRepository;
import com.dut.healthme.repository.CustomersRepository;
import com.dut.healthme.service.CloudinaryService;
import com.dut.healthme.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.Period;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomersRepository customerRepository;
    private final AccountsRepository accountRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    public CustomerInfoResponse getCustomerInfo(Long accountId) {
        Customer customer = customerRepository.findByAccountId(accountId);

        if (customer == null)
            throw new IllegalArgumentException("Customer not found with account's id: " + accountId);

        CustomerInfoResponse customerInfo = new CustomerInfoResponse().fromEntity(customer);

        // Perform the calculations
        customerInfo.setBodyShape(calculateBodyShape(customerInfo.getChestMeasurement(),
            customerInfo.getWaistMeasurement(), customerInfo.getHipsMeasurement()));

        customerInfo.setSuggestedCalorieIntake(calculateCalorieIntake(customerInfo.getWeight(),
            customerInfo.getHeight(), customerInfo.getHealthGoal(), customerInfo.getDateOfBirth(), customerInfo.getGender(), customerInfo.getActivityIndex()));

        return customerInfo;
    }

    // Method to calculate body shape
    private String calculateBodyShape(Double chest, Double waist, Double hips) {
        if (waist < chest && waist < hips) {
            if (Math.abs(chest - hips) < 5) {
                return "đồng hồ cát";
            } else if (hips > chest) {
                return "quả lê";
            } else {
                return "quả táo";
            }
        }
        return "chữ nhật";
    }

    // Method to calculate suggested calorie intake based on health goals
    private Double calculateCalorieIntake(Double weight, Double height, HealthGoal healthGoal, Timestamp dateOfBirth, Gender gender, short activityIndex) {
        int age = calculateAge(dateOfBirth);
        double bmr;

        // Calculate BMR based on gender
        if (gender == Gender.MALE) {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender == Gender.FEMALE) {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 78;
        }
        double factorParameter = switch (activityIndex) {
            case 1 -> 1.375;
            case 2 -> 1.55;
            case 3 -> 1.725;
            case 4 -> 1.9;
            default -> 1.2;
        };

        // Adjust calorie intake based on health goals
        return switch (healthGoal) {
            case GAIN -> bmr * factorParameter + 500;
            case LOSE -> bmr * factorParameter - 500;
            default -> bmr * factorParameter;
        };
    }

    // Method to calculate age based on date of birth
    private int calculateAge(Timestamp dateOfBirth) {
        if (dateOfBirth == null) {
            return 25;
        }
        LocalDate birthDate = dateOfBirth.toLocalDateTime().toLocalDate();
        LocalDate currentDate = LocalDate.now();
        return Period.between(birthDate, currentDate).getYears();
    }

    @Override
    public CustomerInfoResponse updateHealthGoal(Long accountId, HealthGoal healthGoal) {
        Customer customer = customerRepository.findByAccountId(accountId);

        if (customer == null)
            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_NOT_FOUND);

        customer.setHealthGoal(healthGoal);

        customer = customerRepository.save(customer);

        return new CustomerInfoResponse().fromEntity(customer);
    }

    @Override
    public CustomerInfoResponse updateActivityIndex(Long accountId, short activityIndex) {
        Customer customer = customerRepository.findByAccountId(accountId);

        if (customer == null)
            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_NOT_FOUND);

        customer.setActivityIndex(activityIndex);

        customer = customerRepository.save(customer);

        return new CustomerInfoResponse().fromEntity(customer);
    }

    @Override
    public CustomerInfoResponse updateInfo(Account account, UpdateCustomerInfoRequest request) {
        Customer customer = customerRepository.findByAccountId(account.getId());
        account = request.toAccountEntity(account);
        customer = request.toCustomerEntity(customer);
        customer.setAccount(account);
        accountRepository.save(account);
        customerRepository.save(customer);
        return new CustomerInfoResponse().fromEntity(customer);
    }

    @Override
    public AccountInfo updateAvatar(Account account, MultipartFile avatar) {
        if (CommonUtils.String.isNotEmptyOrNull(account.getAvatar())) {
            cloudinaryService.deleteFileByUrl(account.getAvatar());
        }

        String avatarUrl = cloudinaryService.uploadFile(avatar);
        account.setAvatar(avatarUrl);
        accountRepository.save(account);
        return new AccountInfo().fromEntity(account);
    }

    @Override
    public String getCustomerAddress(Account account) {
        Customer customer = customerRepository.findByAccountId(account.getId());

        if (customer == null)
            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_NOT_FOUND);

        return customer.getAddress();
    }

    @Override
    public String updateAddress(Account account, String address) {
        if (address == null || address.length() <= 10) {
            throw new BadRequestException(ErrorMessageConstants.ADDRESS_INVALID);
        }

        Customer customer = customerRepository.findByAccountId(account.getId());
        if (customer == null) {
            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_NOT_FOUND);
        }

        customer.setAddress(address);
        customer = customerRepository.save(customer);

        return customer.getAddress();
    }

}
