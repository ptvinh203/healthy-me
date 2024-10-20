package com.dut.healthme.entity;

import com.dut.healthme.common.model.AbstractEntity;
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
import org.hibernate.annotations.Type;

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

    @OneToMany(mappedBy = "restaurant", fetch = FetchType.EAGER)
//    @JsonManagedReference
    private List<Item> items;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;
}
