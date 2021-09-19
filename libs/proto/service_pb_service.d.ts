// package: main
// file: proto/service.proto

import * as proto_service_pb from "../proto/service_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MyGRPCnewMLResult = {
  readonly methodName: string;
  readonly service: typeof MyGRPC;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_service_pb.ReqMLResult;
  readonly responseType: typeof proto_service_pb.ResEmpty;
};

type MyGRPCpullMLResult = {
  readonly methodName: string;
  readonly service: typeof MyGRPC;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof proto_service_pb.ReqPullMLResult;
  readonly responseType: typeof proto_service_pb.ResMLResult;
};

type MyGRPCvalidateOCR = {
  readonly methodName: string;
  readonly service: typeof MyGRPC;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_service_pb.ReqValidateOCR;
  readonly responseType: typeof proto_service_pb.ResEmpty;
};

type MyGRPClistContainerOCRs = {
  readonly methodName: string;
  readonly service: typeof MyGRPC;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_service_pb.ReqListContainerOCRs;
  readonly responseType: typeof proto_service_pb.ResListContainerOCRs;
};

type MyGRPClistCamSettings = {
  readonly methodName: string;
  readonly service: typeof MyGRPC;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_service_pb.ReqListCamSettings;
  readonly responseType: typeof proto_service_pb.ResListCamSettings;
};

type MyGRPClistLanes = {
  readonly methodName: string;
  readonly service: typeof MyGRPC;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_service_pb.ReqListLanes;
  readonly responseType: typeof proto_service_pb.ResListLanes;
};

export class MyGRPC {
  static readonly serviceName: string;
  static readonly newMLResult: MyGRPCnewMLResult;
  static readonly pullMLResult: MyGRPCpullMLResult;
  static readonly validateOCR: MyGRPCvalidateOCR;
  static readonly listContainerOCRs: MyGRPClistContainerOCRs;
  static readonly listCamSettings: MyGRPClistCamSettings;
  static readonly listLanes: MyGRPClistLanes;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class MyGRPCClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  newMLResult(
    requestMessage: proto_service_pb.ReqMLResult,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResEmpty|null) => void
  ): UnaryResponse;
  newMLResult(
    requestMessage: proto_service_pb.ReqMLResult,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResEmpty|null) => void
  ): UnaryResponse;
  pullMLResult(requestMessage: proto_service_pb.ReqPullMLResult, metadata?: grpc.Metadata): ResponseStream<proto_service_pb.ResMLResult>;
  validateOCR(
    requestMessage: proto_service_pb.ReqValidateOCR,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResEmpty|null) => void
  ): UnaryResponse;
  validateOCR(
    requestMessage: proto_service_pb.ReqValidateOCR,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResEmpty|null) => void
  ): UnaryResponse;
  listContainerOCRs(
    requestMessage: proto_service_pb.ReqListContainerOCRs,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResListContainerOCRs|null) => void
  ): UnaryResponse;
  listContainerOCRs(
    requestMessage: proto_service_pb.ReqListContainerOCRs,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResListContainerOCRs|null) => void
  ): UnaryResponse;
  listCamSettings(
    requestMessage: proto_service_pb.ReqListCamSettings,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResListCamSettings|null) => void
  ): UnaryResponse;
  listCamSettings(
    requestMessage: proto_service_pb.ReqListCamSettings,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResListCamSettings|null) => void
  ): UnaryResponse;
  listLanes(
    requestMessage: proto_service_pb.ReqListLanes,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResListLanes|null) => void
  ): UnaryResponse;
  listLanes(
    requestMessage: proto_service_pb.ReqListLanes,
    callback: (error: ServiceError|null, responseMessage: proto_service_pb.ResListLanes|null) => void
  ): UnaryResponse;
}

