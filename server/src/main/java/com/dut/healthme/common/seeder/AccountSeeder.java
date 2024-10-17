package com.dut.healthme.common.seeder;

import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Customer;
import com.dut.healthme.entity.Restaurant;
import com.dut.healthme.entity.enums.AccountRole;
import com.dut.healthme.entity.enums.Gender;
import com.dut.healthme.entity.enums.HealthGoal;
import com.dut.healthme.repository.AccountsRepository;
import com.dut.healthme.repository.CustomersRepository;
import com.dut.healthme.repository.RestaurantsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(1)
@Slf4j
public class AccountSeeder implements CommandLineRunner {
    private final AccountsRepository repository;
    private final CustomersRepository customersRepository;
    private final RestaurantsRepository restaurantsRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        final String passwordHash = passwordEncoder.encode("123456Aa");

        // Customer account
        var customerEmail = "customer@gmail.com";
        if (!repository.existsByEmail(customerEmail)) {
            var customerAccount = Account.builder()
                .email(customerEmail)
                .password(passwordHash)
                .role(AccountRole.CUSTOMER)
                .displayName("customer.it.nihongo")
                .build();
            try {
                customerAccount = repository.save(customerAccount);

                // Customer profile
                customersRepository.save(Customer.builder()
                    .account(customerAccount)
                    .dateOfBirth(Timestamp.valueOf("2003-01-01 00:00:00"))
                    .address("54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng, Việt Nam")
                    .phoneNumber("0123456789")
                    .gender(Gender.MALE)
                    .height(175.0)
                    .weight(70.0)
                    .bmi(22.86) // weight / (height / 100) ^ 2
                    .heartRate(72.0)
                    .bloodGlucose(90.0)
                    .chestMeasurement(100.0)
                    .waistMeasurement(85.0)
                    .hipsMeasurement(95.0)
                    .healthGoal(HealthGoal.MAINTAIN)
                    .build()
                );
            } catch (Exception e) {
                log.error("Error seeding customer account: {}", e.getMessage());
            }
        }

        // Restaurant account
        var restaurantEmail = "restaurant@gmail.com";
        if (!repository.existsByEmail(restaurantEmail)) {
            var restaurantAccount = Account.builder()
                .email(restaurantEmail)
                .password(passwordHash)
                .role(AccountRole.RESTAURANT)
                .displayName("restaurant.it.nihongo")
                .build();
            try {
                restaurantAccount = repository.save(restaurantAccount);

                // Restaurant profile
                restaurantsRepository.save(Restaurant.builder()
                    .name("Nhà hàng Hải Sản Đà Nẵng")
                    .information("Chuyên phục vụ các món hải sản tươi sống tại Đà Nẵng, không gian thoáng mát và giá cả hợp lý.")
                    .certification(
                        List.of(
                            "https://luathongduc.com/data/mau%20giay%20chung%20nhan%20ve%20sinh%20thuc%20pham.jpg",
                            "https://tieuchuansanpham.com/wp-content/uploads/2017/05/thu-tuc-cap-giay-chung-nhan-ve-sinh-an-toan-thuc-pham1.jpg"
                        )
                    )
                    .phoneNumber("0901234567")
                    .address("123 Đường Trần Phú, Hải Châu, Đà Nẵng, Việt Nam")
                    .build()
                );
            } catch (Exception e) {
                log.error("Error seeding restaurant account: {}", e.getMessage());
            }
        }

        // Admin account
        var adminEmail = "admin@gmail.com";
        if (!repository.existsByEmail(adminEmail)) {
            var adminAccount = Account.builder()
                .email(adminEmail)
                .password(passwordHash)
                .role(AccountRole.ADMIN)
                .displayName("admin.it.nihongo")
                .build();
            try {
                repository.save(adminAccount);
            } catch (Exception e) {
                log.error("Error seeding admin account: {}", e.getMessage());
            }
        }
    }
}
