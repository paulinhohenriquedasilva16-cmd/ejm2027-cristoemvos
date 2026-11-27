import { motion } from "framer-motion";
import { Flame, BookOpen, Users, Play, Youtube } from "lucide-react";
import YouTubeFacade from "@/components/YouTubeFacade";
import logoCristoEmVosBadge from "@/assets/logo-cristoemvos-badge.jpg";
import prPedroPhoto from "@/assets/pr-pedro-vitorino.jpg";

const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding scroll-mt-20 bg-background">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center md:mb-14"
        >
          <h2 className="mb-5 font-display text-2xl text-foreground md:text-4xl">
            Sobre o <span className="gradient-text">EJM</span>
          </h2>
          <p className="mx-auto max-w-3xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
            O EJM é mais do que um encontro: é um altar levantado para despertar a juventude.
            O evento reúne jovens e famílias do mundo todo em uma só fé, fundamentados na mensagem
            do Profeta William Marrion Branham.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {[
            {
              icon: Flame,
              title: "Avivamento",
              description:
                "Um fogo que queima nos corações. Dias de culto intenso, adoração profunda e presença do Espírito Santo.",
            },
            {
              icon: BookOpen,
              title: "A Mensagem",
              description:
                "Fundamentados na doutrina restaurada pelo Profeta William Marrion Branham para esta geração.",
            },
            {
              icon: Users,
              title: "Comunhão",
              description:
                "Esta edição acontece em São Paulo sob a organização do Pr. Pedro Vitorino e da Igreja Cristo em Vós.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="rounded-2xl bg-muted p-6 text-center transition-shadow hover:shadow-lg md:p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl gradient-bg">
                <item.icon className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
              </div>
              <h3 className="mb-3 font-display text-lg text-foreground">{item.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Official Organizer & Pastor Authority Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-6 md:p-7"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
            <div className="relative shrink-0">
              <div className="h-28 w-28 overflow-hidden rounded-2xl border-2 border-primary/30 bg-muted shadow-md sm:h-32 sm:w-32">
                <img
                  src={prPedroPhoto}
                  alt="Pr. Pedro Vitorino, pastor responsável pelo EJM 2027"
                  width={128}
                  height={128}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <img
                src={logoCristoEmVosBadge}
                alt="Logo oficial Igreja Cristo em Vós"
                width={38}
                height={38}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full border-2 border-card object-cover shadow"
              />
            </div>

            <div className="min-w-0 flex-1 font-body">
              <span className="mb-1.5 inline-block rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-ink">
                Organização Oficial · Igreja Cristo em Vós
              </span>
              <h3 className="font-display text-base text-foreground sm:text-lg">
                Pr. Pedro Vitorino
              </h3>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
                Pastor responsável pelo EJM 2027
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Um encontro organizado com zelo pela <strong className="text-foreground">Igreja Cristo em Vós</strong>, feito de irmãos para irmãos e sem fins lucrativos, para que jovens e famílias vivam três dias inesquecíveis na presença de Deus.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Seção de vídeo - EJMs anteriores (Click-to-play Facade) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 md:mt-10"
        >
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-primary/20 bg-muted/50 p-3 md:p-4">
            <div className="absolute -left-px -right-px -top-px h-1 rounded-t-2xl gradient-bg" />
            <div className="mb-3 flex items-center gap-2">
              <Play className="h-4 w-4 text-primary-ink" aria-hidden="true" />
              <h3 className="font-display text-sm text-foreground md:text-base">
                Reviva os EJMs Anteriores
              </h3>
            </div>
            <p className="mb-3 font-body text-xs leading-relaxed text-muted-foreground md:text-sm">
              Veja como Deus se fez presente nas edições passadas e como Ele se fará presente em 2027!
            </p>
            <YouTubeFacade
              videoId="kQ2O8YTGH24"
              title="Reviva os EJMs 2025 e 2026"
              className="rounded-xl"
            />
            <div className="mt-3 text-center">
              <a
                href="https://www.youtube.com/@cristo_emvos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-body text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary-ink sm:text-sm"
              >
                <Youtube className="h-4 w-4 text-primary-ink" aria-hidden="true" />
                <span>Ver mais vídeos no YouTube da Igreja</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
