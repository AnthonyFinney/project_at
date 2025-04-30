export const BagSummary: React.FC<{ itemCount: number }> = ({ itemCount }) => (
    <section className="mb-8">
        <div className="flex items-center justify-between border p-6 rounded-lg">
            <h2 className="text-lg font-semibold uppercase">
                Your Bag Summary ({itemCount} item)
            </h2>
            <button aria-label="Expand" className="text-2xl leading-none">
                ＋
            </button>
        </div>
    </section>
);
