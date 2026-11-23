const sources = new Map<string, string>([
  ["/Bebida Rústica de Kiwi Fresco-2.webp", "/assets/fast/9bc45d18a43d.webp 720w, /Bebida%20Ru%CC%81stica%20de%20Kiwi%20Fresco-2.webp 1600w"],
  ["/Biblioteca de Cachaças Artesanais.webp", "/assets/fast/e9c42a4746d2-400.webp 400w, /assets/fast/e9c42a4746d2.webp 960w, /Biblioteca%20de%20Cachac%CC%A7as%20Artesanais.webp 1600w"],
  ["/Caipirinha Tropical com Limão e Hortelã-3.webp", "/assets/fast/7f3454422af3.webp 720w, /Caipirinha%20Tropical%20com%20Lima%CC%83o%20e%20Hortela%CC%83-3.webp 1600w"],
  ["/Garrafa de Infusão Frutada com Especiarias-5.webp", "/assets/fast/e9724b34d9ad.webp 720w, /Garrafa%20de%20Infusa%CC%83o%20Frutada%20com%20Especiarias-5.webp 1600w"],
  ["/Licor de laranja com especiarias rústicas-4.webp", "/assets/fast/ced28ff653b6.webp 720w, /Licor%20de%20laranja%20com%20especiarias%20ru%CC%81sticas-4.webp 1600w"],
  ["/Mockup Rústico da Biblioteca de Cachaças.webp", "/assets/fast/dbb8efbe7fb3-400.webp 400w, /assets/fast/dbb8efbe7fb3.webp 960w, /Mockup%20Ru%CC%81stico%20da%20Biblioteca%20de%20Cachac%CC%A7as.webp 1600w"],
  ["/Poção Tropical de Maracujá Artesanal-1.webp", "/assets/fast/d7ae4877dfcd.webp 720w, /Poc%CC%A7a%CC%83o%20Tropical%20de%20Maracuja%CC%81%20Artesanal-1.webp 1600w"],
  ["/Refresco Tropical Festivo com Maracujá-6.webp", "/assets/fast/00d570204966.webp 720w, /Refresco%20Tropical%20Festivo%20com%20Maracuja%CC%81-6.webp 1600w"],
]);

export function responsiveSource(src: string) {
  return sources.get(decodeURI(src));
}
