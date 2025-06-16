import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Test SEO - ComputerZone Maroc",
  description: "Page de test pour vérifier l'implémentation SEO de ComputerZone Maroc",
}

export default function TestSEOPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Test SEO Page</h1>
      <div className="space-y-4">
        <p>Cette page est utilisée pour tester l'implémentation SEO.</p>
        <p>Vous pouvez utiliser les outils suivants pour vérifier :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>View Page Source (Ctrl+U) pour voir les meta tags</li>
          <li>Google Rich Results Test</li>
          <li>Facebook Sharing Debugger</li>
          <li>Twitter Card Validator</li>
        </ul>
      </div>
    </div>
  )
} 