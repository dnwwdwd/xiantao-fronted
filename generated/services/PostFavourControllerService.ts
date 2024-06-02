/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_PostVO_ } from '../models/BaseResponse_List_PostVO_';
import type { PostFavourRequest } from '../models/PostFavourRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostFavourControllerService {
    /**
     * addPostFavour
     * @param postFavourRequest postFavourRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addPostFavourUsingPost(
        postFavourRequest: PostFavourRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_favour/add',
            body: postFavourRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deletePostFavour
     * @param postFavourRequest postFavourRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deletePostFavourUsingPost(
        postFavourRequest: PostFavourRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_favour/delete',
            body: postFavourRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyPostFavour
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @returns BaseResponse_List_PostVO_ OK
     * @throws ApiError
     */
    public static listMyPostFavourUsingGet(
        pageNum?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_List_PostVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/post_favour/list/my',
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
