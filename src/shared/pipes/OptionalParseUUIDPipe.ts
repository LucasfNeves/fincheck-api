import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (value === undefined) {
      return undefined as unknown as Promise<string>;
    }

    return super.transform(value, metadata);
  }
}
