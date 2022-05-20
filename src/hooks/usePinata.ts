import pinataSDK, { PinataClient } from "@pinata/sdk"
import { Readable } from "stream"

const client = pinataSDK(
  process.env.REACT_APP_PINATA_KEY!,
  process.env.REACT_APP_PINATA_SECRET!
)
export const usePinata = () => {
  const upload = async (file: any) => {
    const stream = Readable.from(file.buffer)

    // * Needed to prevent error
    // * ref: https://github.com/PinataCloud/Pinata-SDK/issues/28#issuecomment-816439078
    // stream["path"] = file.originalname

    const pinResponse = await client.pinFileToIPFS(stream, {})
    return pinResponse.IpfsHash
  }
  return { upload }
}
