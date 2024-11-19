package com.dut.healthme.entity;

import com.dut.healthme.common.model.AbstractEntity;
import com.dut.healthme.entity.enums.AccountRole;
import com.dut.healthme.entity.enums.RestaurantStatus;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.Type;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "restaurants")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id")
public class Restaurant extends AbstractEntity {
    private String information;

    @Column(nullable = false)
    @Type(ListArrayType.class)
    private List<String> certification;

    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, columnDefinition = "restaurant_status DEFAULT 'AWAITING_APPROVAL'")
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private RestaurantStatus status = RestaurantStatus.AWAITING_APPROVAL;

    @OneToMany(mappedBy = "restaurant", fetch = FetchType.EAGER)
//    @JsonManagedReference
    private List<Item> items;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;
}
