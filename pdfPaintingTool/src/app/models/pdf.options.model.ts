export class PDFOptions{
    pageZoomSize:string;
    pageHeader:string;
    pageFooter:string;
    pageStamp:string;
    stampPosition:string;
    constructor(p_pageZoomSize:string,p_pageHeader:string,
        p_pageFooter:string,p_pageStamp:string,p_stampPosition:string){
            this.pageZoomSize = p_pageZoomSize;
            this.pageHeader = p_pageHeader;
            this.pageFooter = p_pageFooter;
            this.pageStamp = p_pageStamp;
            this.stampPosition = p_stampPosition;
        }
}