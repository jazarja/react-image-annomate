/**
 * Original code based from https://github.com/suresh2291/react-image-annomate
 */
import React from "react";
type DrawingBoardProps = {
    width: number;
    height: number;
    canDownload?: boolean;
    canCopyToClipboard?: boolean;
    canUpload?: boolean;
    image?: string;
};
declare function DrawingBoard(props: DrawingBoardProps): React.JSX.Element;
declare namespace DrawingBoard {
    var defaultProps: {
        canDownload: boolean;
        canCopyToClipboard: boolean;
        canUpload: boolean;
        image: any;
    };
}
export default DrawingBoard;
