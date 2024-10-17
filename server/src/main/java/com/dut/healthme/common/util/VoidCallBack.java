package com.dut.healthme.common.util;

@FunctionalInterface
public interface VoidCallBack<T> {
    void call(T data);
}
