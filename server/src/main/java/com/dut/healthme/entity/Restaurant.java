package com.dut.healthme.entity;

import com.dut.healthme.common.model.AbstractEntity;
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
public class Restaurant extends AbstractEntity {
    @Column(nullable = false)
    private String name;

    private String information;

    @Column(nullable = false)
    @Type(ListArrayType.class)
    private List<String> certification;

    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @OneToMany(mappedBy = "restaurant", fetch = FetchType.EAGER)
    private List<Item> items;
}
