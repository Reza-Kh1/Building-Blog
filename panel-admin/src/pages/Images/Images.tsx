import UploadImage from "../../components/UploadImage/UploadImage";
import ShowImage from "../../components/ShowImage/ShowImage";
export default function Images() {
  return (
    <div>
      <div className="w-2/12 flex justify-center flex-col items-center gap-3 mt-3">
      <span>آپلود عکس</span>
        <UploadImage />
      </div>
      <div className="mt-8">
        <ShowImage />
      </div>
    </div>
  );
}