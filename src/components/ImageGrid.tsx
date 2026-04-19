import Image from 'next/image'

const sizes = '(max-width: 768px) 40vw, (max-width: 1024px) 18vw, 16vw'

function GridImage({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={sizes}
      className="object-cover"
    />
  )
}

export function ImageGrid() {
  return (
    <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] auto-rows-[120px] md:grid-cols-[repeat(11,minmax(0,1fr))] md:auto-rows-[200px] lg:auto-rows-[400px] gap-4 overflow-hidden">
      <div className="relative rounded-[16px] overflow-hidden col-[1/5] row-[1] md:col-[1/3] md:row-[1]">
        <GridImage src="/images/grid-imgs/1.webp.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[5/8] row-[1] md:col-[3/7] md:row-[1]">
        <GridImage src="/images/grid-imgs/2.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[1/3] row-[2] md:col-[7/9] md:row-[1]">
        <GridImage src="/images/grid-imgs/3.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[3/6] row-[2] md:col-[9/12] md:row-[1]">
        <GridImage src="/images/grid-imgs/4.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[6/8] row-[2] md:col-[1/4] md:row-[2]">
        <GridImage src="/images/grid-imgs/5.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[1/5] row-[3] md:col-[4/6] md:row-[2]">
        <GridImage src="/images/grid-imgs/6.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[5/8] row-[3] md:col-[6/10] md:row-[2]">
        <GridImage src="/images/grid-imgs/7.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[1/4] row-[4] md:col-[10/12] md:row-[2]">
        <GridImage src="/images/grid-imgs/8.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[4/6] row-[4] md:col-[1/5] md:row-[3]">
        <GridImage src="/images/grid-imgs/9.jpeg" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[6/8] row-[4] md:col-[5/7] md:row-[3]">
        <GridImage src="/images/grid-imgs/10.jpeg" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[1/3] row-[5] md:col-[7/9] md:row-[3]">
        <GridImage src="/images/grid-imgs/11.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[3/6] row-[5] md:col-[9/12] md:row-[3]">
        <GridImage src="/images/grid-imgs/12.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[6/8] row-[5] md:col-[1/4] md:row-[4]">
        <GridImage src="/images/grid-imgs/13.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[1/4] row-[6] md:col-[4/7] md:row-[4]">
        <GridImage src="/images/grid-imgs/14.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[4/6] row-[6] md:col-[7/10] md:row-[4]">
        <GridImage src="/images/grid-imgs/15.avif" />
      </div>
      <div className="relative rounded-[16px] overflow-hidden col-[6/8] row-[6] md:col-[10/12] md:row-[4]">
        <GridImage src="/images/grid-imgs/16.webp" />
      </div>
    </div>
  )
}
