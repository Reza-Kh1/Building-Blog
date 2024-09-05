import ImgTag from "@/components/ImgTag/ImgTag";
import LoadingImg from "@/components/LoadingImg/LoadingImg";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>سلام و دررود</p>
      <ImgTag alt={"testImg for alt"} height={100} width={100} src={"https://th.bing.com/th/id/OIP.5GgkVN3lmwliLsgwbJzjQHaE8?rs=1&pid=ImgDetMain"} />
      <div className="w-10">

        <LoadingImg />
      </div>
    </main>
  );
}
