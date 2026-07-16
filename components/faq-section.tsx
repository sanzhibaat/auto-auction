import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/data";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-b border-border bg-background"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-24 lg:px-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Вопросы
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Часто задаваемые вопросы
          </h2>
          <p className="mt-3 text-muted-foreground">
            Не нашли ответ? Напишите нам в форме ниже или позвоните — ответим
            подробно по вашему случаю.
          </p>
        </div>

        <Accordion openMultiple={false} className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
