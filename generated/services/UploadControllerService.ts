/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UploadControllerService {
    /**
     * uploadImage
     * @param multipartFile multipartFile
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadImageUsingPost(
        multipartFile?: Blob,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/upload/image',
            formData: {
                'multipartFile': multipartFile,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
