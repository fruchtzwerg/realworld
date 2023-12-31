/* eslint-disable-next-line */
export interface FeedHeaderProps {}

export function FeedHeader(props: FeedHeaderProps) {
  return (
    <div className="p-8 mb-8 shadow-inner shadow-black/20 bg-primary text-primary-content">
      <div className="max-w-6xl px-4 mx-auto">
        <h1 className="text-[3.5rem] leading-[5rem] pb-2 font-bold text-center drop-shadow-lg font-title">
          conduit
        </h1>
        <p className="text-2xl text-center">A place to share your knowledge.</p>
      </div>
    </div>
  );
}

export default FeedHeader;
