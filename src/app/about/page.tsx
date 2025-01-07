import { Metadata } from 'next'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: 'About Ninni Nummela | Makeup Artist & Creative Consultant',
  description: 'Ninni Nummela is a London-based makeup artist, creative, and consultant known for her fresh-faced, dewy looks and innovative use of texture and colour.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">About Ninni Nummela</h1>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-lg mb-6">
            Ninni Nummela is a London-based makeup artist, creative, and consultant with an international presence. Originally from Finland, Ninni began her journey assisting renowned makeup artist Charlotte Tilbury before establishing her own career.
          </p>
          <Separator className="my-6" />
          <p className="text-lg mb-6">
            Known for her fresh-faced, dewy looks and innovative use of texture and colour, Ninni's artistry enhances natural beauty with effortless sophistication. Deeply influenced by her Nordic roots, her minimal yet elevated approach has made her a sought-after collaborator for global brands, fashion editorials, and red carpet events.
          </p>
          <Separator className="my-6" />
          <p className="text-lg mb-6">
            Her portfolio includes work with celebrated photographers such as Alasdair McLellan, Juergen Teller, and Liz Collins, alongside campaigns for leading fashion and beauty houses. With contributions to prestigious international publications and collaborations with high-profile personalities, Ninni has built a reputation for her refined and timeless style.
          </p>
          <Separator className="my-6" />
          <p className="text-lg">
            Based in London, Ninni works with clients around the world, bringing a unique perspective to every project.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Expertise</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Fresh-faced, dewy looks</li>
              <li>Innovative use of texture and colour</li>
              <li>Natural beauty enhancement</li>
              <li>Minimal yet elevated approach</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Notable Collaborations</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Global fashion and beauty brands</li>
              <li>High-profile red carpet events</li>
              <li>Prestigious international publications</li>
              <li>Celebrated photographers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

