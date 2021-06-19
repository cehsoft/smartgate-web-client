import { grpc } from "@improbable-eng/grpc-web";

import { Code } from "@improbable-eng/grpc-web/dist/typings/Code";
import { MethodDefinition } from "@improbable-eng/grpc-web/dist/typings/service";
import { Metadata } from "@improbable-eng/grpc-web/dist/typings/metadata";
import { RpcOptions } from "@improbable-eng/grpc-web/dist/typings/client";
import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

interface Request {
  close: () => void;
}
interface InvokeRpcOptions<
  TRequest extends ProtobufMessage,
  TResponse extends ProtobufMessage
> extends RpcOptions {
  host?: string;
  request: TRequest;
  metadata?: Metadata.ConstructorArg;
  onHeaders?: (headers: Metadata) => void;
  onMessage?: (res: TResponse) => void;
  onEnd: (code: Code, message: string, trailers: Metadata) => void;
}

export const grpcInvoke: <
  TRequest extends ProtobufMessage,
  TResponse extends ProtobufMessage,
  M extends MethodDefinition<TRequest, TResponse>
>(
  methodDescriptor: M,
  props: InvokeRpcOptions<TRequest, TResponse>
) => Request = (method, options) => {
  return grpc.invoke(method, {
    ...options,
    transport: grpc.WebsocketTransport(),
    host: process.env.NEXT_PUBLIC_API_MANAGER,
  });
};
