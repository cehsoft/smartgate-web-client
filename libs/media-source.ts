export class MediaSourceStream {
  isReady: boolean = false;
  mediaSource: MediaSource;
  sourceBuffer: SourceBuffer;
  bufferQueue: BufferSource[] = [];

  constructor(format = 'video/mp4; codecs="avc1.42C01E"') {
    this.mediaSource = new MediaSource();
    this.mediaSource.onsourceopen = () => {
      this.sourceBuffer = this.mediaSource.addSourceBuffer(format);
      this.sourceBuffer.mode = "sequence";

      // bind `updateend` event handler for sourceBuffer
      this.sourceBuffer.addEventListener("updateend", () => {
        // try to load packets in queue when sourceBuffer idle
        this._loadPacketToBuf();
      });

      this.isReady = true;
    };
  }

  isQueueEmpty() {
    return this.bufferQueue.length === 0;
  }

  isBufferBusy() {
    return this.sourceBuffer.updating;
  }

  _loadPacketToBuf() {
    if (!this.isReady || this.isQueueEmpty() || this.isBufferBusy()) {
      return;
    }

    // get packets from queue FIFO
    const data = this.bufferQueue.shift();
    // add packet to sourceBuffer for displaying
    try {
      this.sourceBuffer.appendBuffer(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  pushPacket(data: ArrayBuffer) {
    this.bufferQueue.push(data);
    this._loadPacketToBuf();
  }
}
