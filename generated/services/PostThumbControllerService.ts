/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_PostVO_ } from '../models/BaseResponse_List_PostVO_';
import type { PostThumbRequest } from '../models/PostThumbRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostThumbControllerService {
    /**
     * addPostThumb
     * @param postThumbRequest postThumbRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addPostThumbUsingPost(
        postThumbRequest: PostThumbRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_thumb/add',
            body: postThumbRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deletePostThumb
     * @param postThumbRequest postThumbRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deletePostThumbUsingPost(
        postThumbRequest: PostThumbRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_thumb/delete',
            body: postThumbRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyPostThumb
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @returns BaseResponse_List_PostVO_ OK
     * @throws ApiError
     */
    public static listMyPostThumbUsingGet(
        pageNum?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_List_PostVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/post_thumb/list/my',
            query: {
                'pageNum': pageNum,
                'pageSize': pageSize,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
