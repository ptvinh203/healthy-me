package com.dut.healthme.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CloudinaryService {
    String uploadFile(MultipartFile file);

    List<String> uploadFiles(List<MultipartFile> files);

    void deleteFileByUrl(String url);
}
