export class MediaSourceStream {
  isReady: boolean = false;
  mediaSource: MediaSource;
  sourceBuffer: SourceBuffer;
  bufferQueue: BufferSource[] = [];
  handleError: (error: any) => void;

  constructor(
    format = 'video/mp4; codecs="avc1.42C01E"',
    onError: (error) => void = () => {}
  ) {
    this.handleError = onError;

    this.mediaSource = new MediaSource();
    this.mediaSource.onsourceopen = () => {
      this.sourceBuffer = this.mediaSource.addSourceBuffer(format);
      this.sourceBuffer.mode = "sequence";

      // bind `updateend` event handler for sourceBuffer
      this.sourceBuffer.addEventListener("updateend", () => {
        // try to load packets in queue when sourceBuffer idle
        this._loadPacketToBuf();
      });
    };
  }

  isQueueEmpty() {
    return this.bufferQueue.length === 0;
  }

  isBufferBusy() {
    return this.sourceBuffer.updating;
  }

  _loadPacketToBuf() {
    if (this.mediaSource.readyState !== "open") {
      return;
    }

    if (this.isQueueEmpty() || this.isBufferBusy()) {
      return;
    }

    // get packets from queue FIFO
    const data = this.bufferQueue.shift();
    // add packet to sourceBuffer for displaying
    try {
      this.sourceBuffer.appendBuffer(data);
    } catch (error) {
      this.handleError(error);
    }
  }

  pushPacket(data: ArrayBuffer) {
    this.bufferQueue.push(data);
    this._loadPacketToBuf();
  }
}
