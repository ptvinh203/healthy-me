package com.dut.healthme.dto.response;


import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.common.model.AbstractDTO;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.enums.AccountRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@JsonSnakeCaseNaming
public class AccountInfo extends AbstractDTO<Account> {
    private String email;
    private String name;
    private String avatar;
    private AccountRole role;

    @Override
    public AccountInfo fromEntity(Account entity) {
        return AccountInfo.builder()
            .id(entity.getId())
            .email(entity.getEmail())
            .name(entity.getName())
            .role(entity.getRole())
            .avatar(entity.getAvatar())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .deletedAt(entity.getDeletedAt())
            .build();
    }
}
