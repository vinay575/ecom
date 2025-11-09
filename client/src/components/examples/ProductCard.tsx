import { ProductCard } from '../product-card';
import uiKitImage from "@assets/generated_images/UI_kit_product_preview_daa4ad77.png";

export default function ProductCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ProductCard
        id="example"
        image={uiKitImage}
        title="Modern Dashboard UI Kit"
        author="DesignStudio"
        category="UI Kits"
        price={49}
        rating={4.9}
        downloads={1240}
        isFeatured={true}
      />
    </div>
  );
}
