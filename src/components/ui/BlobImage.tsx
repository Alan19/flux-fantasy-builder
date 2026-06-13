import React, {useState} from "react";

export function BlobImage(props: Readonly<{ blob: Blob, imgProps: Exclude<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "src"> }>) {
    const [src, setSrc] = useState<string>()

    const reader = new FileReader();
    if (props.blob) {
        reader.readAsDataURL(props.blob);
        reader.onload = () => {
            if (reader.result) {
                setSrc(reader.result as string)
            }
        }
    }
    return <img src={src} {...props.imgProps} />
}