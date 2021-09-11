// package: main
// file: proto/service.proto

import * as jspb from "google-protobuf";

export class ResStatus extends jspb.Message {
  getStatuscode(): number;
  setStatuscode(value: number): void;

  getErrcode(): string;
  setErrcode(value: string): void;

  getErrmessage(): string;
  setErrmessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResStatus.AsObject;
  static toObject(includeInstance: boolean, msg: ResStatus): ResStatus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResStatus;
  static deserializeBinaryFromReader(message: ResStatus, reader: jspb.BinaryReader): ResStatus;
}

export namespace ResStatus {
  export type AsObject = {
    statuscode: number,
    errcode: string,
    errmessage: string,
  }
}

export class ResEmpty extends jspb.Message {
  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): ResStatus | undefined;
  setStatus(value?: ResStatus): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResEmpty.AsObject;
  static toObject(includeInstance: boolean, msg: ResEmpty): ResEmpty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResEmpty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResEmpty;
  static deserializeBinaryFromReader(message: ResEmpty, reader: jspb.BinaryReader): ResEmpty;
}

export namespace ResEmpty {
  export type AsObject = {
    status?: ResStatus.AsObject,
  }
}

export class RequestPaging extends jspb.Message {
  hasOffset(): boolean;
  clearOffset(): void;
  getOffset(): number;
  setOffset(value: number): void;

  hasLimit(): boolean;
  clearLimit(): void;
  getLimit(): number;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestPaging.AsObject;
  static toObject(includeInstance: boolean, msg: RequestPaging): RequestPaging.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RequestPaging, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestPaging;
  static deserializeBinaryFromReader(message: RequestPaging, reader: jspb.BinaryReader): RequestPaging;
}

export namespace RequestPaging {
  export type AsObject = {
    offset: number,
    limit: number,
  }
}

export class ReqEmpty extends jspb.Message {
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): RequestPaging | undefined;
  setPaging(value?: RequestPaging): void;

  hasOffset(): boolean;
  clearOffset(): void;
  getOffset(): number;
  setOffset(value: number): void;

  hasLimit(): boolean;
  clearLimit(): void;
  getLimit(): number;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReqEmpty.AsObject;
  static toObject(includeInstance: boolean, msg: ReqEmpty): ReqEmpty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReqEmpty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReqEmpty;
  static deserializeBinaryFromReader(message: ReqEmpty, reader: jspb.BinaryReader): ReqEmpty;
}

export namespace ReqEmpty {
  export type AsObject = {
    paging?: RequestPaging.AsObject,
    offset: number,
    limit: number,
  }
}

export class ReqMLResult extends jspb.Message {
  getContainerid(): string;
  setContainerid(value: string): void;

  getResult(): string;
  setResult(value: string): void;

  getCamname(): string;
  setCamname(value: string): void;

  getImageurl(): string;
  setImageurl(value: string): void;

  getScore(): number;
  setScore(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReqMLResult.AsObject;
  static toObject(includeInstance: boolean, msg: ReqMLResult): ReqMLResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReqMLResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReqMLResult;
  static deserializeBinaryFromReader(message: ReqMLResult, reader: jspb.BinaryReader): ReqMLResult;
}

export namespace ReqMLResult {
  export type AsObject = {
    containerid: string,
    result: string,
    camname: string,
    imageurl: string,
    score: number,
  }
}

export class ReqPullMLResult extends jspb.Message {
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): RequestPaging | undefined;
  setPaging(value?: RequestPaging): void;

  getLaneid(): number;
  setLaneid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReqPullMLResult.AsObject;
  static toObject(includeInstance: boolean, msg: ReqPullMLResult): ReqPullMLResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReqPullMLResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReqPullMLResult;
  static deserializeBinaryFromReader(message: ReqPullMLResult, reader: jspb.BinaryReader): ReqPullMLResult;
}

export namespace ReqPullMLResult {
  export type AsObject = {
    paging?: RequestPaging.AsObject,
    laneid: number,
  }
}

export class ReqListContainerOCRs extends jspb.Message {
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): RequestPaging | undefined;
  setPaging(value?: RequestPaging): void;

  getLaneid(): number;
  setLaneid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReqListContainerOCRs.AsObject;
  static toObject(includeInstance: boolean, msg: ReqListContainerOCRs): ReqListContainerOCRs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReqListContainerOCRs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReqListContainerOCRs;
  static deserializeBinaryFromReader(message: ReqListContainerOCRs, reader: jspb.BinaryReader): ReqListContainerOCRs;
}

export namespace ReqListContainerOCRs {
  export type AsObject = {
    paging?: RequestPaging.AsObject,
    laneid: number,
  }
}

export class ResMLResult extends jspb.Message {
  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): ResStatus | undefined;
  setStatus(value?: ResStatus): void;

  getSuggestid(): number;
  setSuggestid(value: number): void;

  getContainerid(): string;
  setContainerid(value: string): void;

  getImageurl(): string;
  setImageurl(value: string): void;

  getScore(): number;
  setScore(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResMLResult.AsObject;
  static toObject(includeInstance: boolean, msg: ResMLResult): ResMLResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResMLResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResMLResult;
  static deserializeBinaryFromReader(message: ResMLResult, reader: jspb.BinaryReader): ResMLResult;
}

export namespace ResMLResult {
  export type AsObject = {
    status?: ResStatus.AsObject,
    suggestid: number,
    containerid: string,
    imageurl: string,
    score: number,
  }
}

export class ContainerOCR extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getScore(): number;
  setScore(value: number): void;

  getContainerid(): string;
  setContainerid(value: string): void;

  getImageurl(): string;
  setImageurl(value: string): void;

  getBic(): string;
  setBic(value: string): void;

  getSerial(): string;
  setSerial(value: string): void;

  getChecksum(): string;
  setChecksum(value: string): void;

  getTrackingtype(): string;
  setTrackingtype(value: string): void;

  getTrackingsession(): string;
  setTrackingsession(value: string): void;

  getCreatedat(): number;
  setCreatedat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContainerOCR.AsObject;
  static toObject(includeInstance: boolean, msg: ContainerOCR): ContainerOCR.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContainerOCR, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContainerOCR;
  static deserializeBinaryFromReader(message: ContainerOCR, reader: jspb.BinaryReader): ContainerOCR;
}

export namespace ContainerOCR {
  export type AsObject = {
    id: number,
    score: number,
    containerid: string,
    imageurl: string,
    bic: string,
    serial: string,
    checksum: string,
    trackingtype: string,
    trackingsession: string,
    createdat: number,
  }
}

export class ContainerTracking extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getOcrid(): number;
  setOcrid(value: number): void;

  getScore(): number;
  setScore(value: number): void;

  getContainerid(): string;
  setContainerid(value: string): void;

  getImageurl(): string;
  setImageurl(value: string): void;

  getBic(): string;
  setBic(value: string): void;

  getSerial(): string;
  setSerial(value: string): void;

  getChecksum(): string;
  setChecksum(value: string): void;

  getCreatedat(): number;
  setCreatedat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContainerTracking.AsObject;
  static toObject(includeInstance: boolean, msg: ContainerTracking): ContainerTracking.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContainerTracking, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContainerTracking;
  static deserializeBinaryFromReader(message: ContainerTracking, reader: jspb.BinaryReader): ContainerTracking;
}

export namespace ContainerTracking {
  export type AsObject = {
    id: number,
    ocrid: number,
    score: number,
    containerid: string,
    imageurl: string,
    bic: string,
    serial: string,
    checksum: string,
    createdat: number,
  }
}

export class ResListContainerOCRs extends jspb.Message {
  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): ResStatus | undefined;
  setStatus(value?: ResStatus): void;

  getTotal(): number;
  setTotal(value: number): void;

  clearOcrsList(): void;
  getOcrsList(): Array<ContainerOCR>;
  setOcrsList(value: Array<ContainerOCR>): void;
  addOcrs(value?: ContainerOCR, index?: number): ContainerOCR;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResListContainerOCRs.AsObject;
  static toObject(includeInstance: boolean, msg: ResListContainerOCRs): ResListContainerOCRs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResListContainerOCRs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResListContainerOCRs;
  static deserializeBinaryFromReader(message: ResListContainerOCRs, reader: jspb.BinaryReader): ResListContainerOCRs;
}

export namespace ResListContainerOCRs {
  export type AsObject = {
    status?: ResStatus.AsObject,
    total: number,
    ocrsList: Array<ContainerOCR.AsObject>,
  }
}

