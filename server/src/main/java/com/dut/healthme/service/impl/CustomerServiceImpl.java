package com.dut.healthme.service.impl;

import com.dut.healthme.common.exception.NotFoundObjectException;
import com.dut.healthme.dto.response.CustomerInfoResponse;
import com.dut.healthme.entity.Customer;
import com.dut.healthme.entity.enums.Gender;
import com.dut.healthme.entity.enums.HealthGoal;
import com.dut.healthme.repository.CustomersRepository;
import com.dut.healthme.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.Period;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomersRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomersRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public CustomerInfoResponse getCustomerInfo(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new IllegalArgumentException("Customer not found with id: " + customerId));

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
        double factorParameter = 1.2;
        switch (activityIndex) {

            case 1: factorParameter = 1.375; break;
            case 2: factorParameter = 1.55; break;
            case 3: factorParameter = 1.725; break;
            case 4: factorParameter = 1.9; break;
            default:
                factorParameter = 1.2; break;
        }

        // Adjust calorie intake based on health goals
        double calorieIntake;
        switch (healthGoal) {
            case GAIN:
                calorieIntake = bmr * factorParameter + 500;
                break;
            case LOSE:
                calorieIntake = bmr * factorParameter - 500;
                break;
            case MAINTAIN:
            default:
                calorieIntake = bmr * factorParameter;
                break;
        }
        return calorieIntake;
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
    public CustomerInfoResponse updateHealthGoal(Long customerId, HealthGoal healthGoal) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new NotFoundObjectException("Customer not found with id " + customerId));

        customer.setHealthGoal(healthGoal);

        customer = customerRepository.save(customer);

        return new CustomerInfoResponse().fromEntity(customer);
    }

    @Override
    public CustomerInfoResponse updateActivityIndex(Long customerId, short activityIndex) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new NotFoundObjectException("Customer not found with id " + customerId));

        customer.setActivityIndex(activityIndex);

        customer = customerRepository.save(customer);

        return new CustomerInfoResponse().fromEntity(customer);
    }
}
