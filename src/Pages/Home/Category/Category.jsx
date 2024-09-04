import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import CategoryCard from "@/Components/ui/CategoryCard/CategoryCard";

const Category = () => {
    return (
        <section className="mt-6 md:mt-8 lg:mt-12 xl:mt-16">
            <SectionTitle heading="Find Your Perfect Companion" subHeading="Browse by type to meet your match."></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 px-4 md:px-6 lg:px-12 xl:px-24">
                <CategoryCard
                    img="https://i.ibb.co/tpmkC0j/cat-outline-img.png"
                    title="Feline Friends"
                    description="Graceful, independent, and endlessly curious find your purr-fect match."
                ></CategoryCard>
                <CategoryCard
                    img="https://i.ibb.co/ysN6BxR/dog-outline-img.png"
                    title="Pawfect Pals"
                    description="Loyal and loving companions ready to fill your home with joy."
                ></CategoryCard>
                <CategoryCard
                    img="https://i.ibb.co/sJGy8CT/rabbit-outline-img.png"
                    title="Hoppy Companions"
                    description="Soft, gentle, and full of hops—bring home a bundle of joy."
                ></CategoryCard>
                <CategoryCard
                    img="https://i.ibb.co/KFcgPkD/fish-outline-img.png"
                    title="Fin-tastic Friends"
                    description="Peaceful and mesmerizing—add a splash of serenity to your life."
                ></CategoryCard>
            </div>
        </section>
    );
};

export default Category;