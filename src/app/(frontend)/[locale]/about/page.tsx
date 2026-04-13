import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ImageGrid } from '@/components/ImageGrid'

type Props = {
  params: Promise<{ locale: string }>
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-[number:var(--font-weight-bold)]">{children}</strong>
}

function P({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <p className={last ? undefined : 'mb-[var(--paragraph-spacing-lg)]'}>
      {children}
    </p>
  )
}

function BodyUk() {
  return (
    <>
      <P>
        <B>«Created in Ukraine»</B>
        {` — продюсерська і дистриб'юторська кінокомпанія, яка спеціалізується на показах українського кіно та кіно, пов'язаного із Україною, в Ізраїлі. Заснована у 2022 році.`}
      </P>
      <P>
        <B>«Created in Ukraine»</B>
        {` випустив на екрани Ізраїлю десятки українських фільмів. Серед них – прем'єрні покази у різних містах країни стрічок «Мавка», «Памфір», «Довбуш», «20 днів у Маріуполі», спецпокази фільмів «Поводир», «Щедрик», «Віддана», «Стоп-Земля», «Терикони», «Земля блакитна, ніби апельсин», «Люксембург, Люксембург», «Мій Карпатський дідусь», «Жива ватра», «Ми не згаснемо», «Лишайся онлайн», «Ля Палісіда», «Відблиск» та інших.`}
      </P>
      <P>
        <B>«Created in Ukraine»</B>
        {` разом із Українським Культурним центром при Посольстві України в Державі Ізраїль проводив безкоштовні покази українського кіно для української громади.`}
      </P>
      <P>
        {`А також покази документального кіно у рамках `}
        <B>Мандрівного міжнародного фестивалю</B>
        {` документального кіно про права людини Docudays UA.`}
      </P>
      <P>
        <B>«Created in Ukraine»</B>
        {` є дистриб'ютором на території Ізраїлю фільмів «Смак Свободи», «Я, Побєда і Берлін», «ШТТЛ», «Королі репу».`}
      </P>
      <P>
        <B>У 2022 році «Created in Ukraine»</B>
        {` виступила організатором Днів Українського Кіно в Синематеках Єрусалиму та Холону.`}
      </P>
      <P>
        Ми співпрацюємо з усіма великими кінотеатральними мережами в Ізраїлі, Синематеками, культурними центрами в Ізраїлі.
      </P>
      <P last>
        {`2024 року `}
        <B>«Created in Ukraine»</B>
        {` є засновником і організатором фестивалю сучасного українського кіно в `}
        <B>Ізраїлі Ukraine Aviv</B>
        {` (Тель-Авів).`}
      </P>
    </>
  )
}

function BodyEn() {
  return (
    <>
      <P>
        <B>{`\u201CCreated in Ukraine\u201D`}</B>
        {` has brought dozens of Ukrainian films to Israeli screens. Among them are premieres of films in various cities across the country, including \u201CMavka,\u201D \u201CPamfir,\u201D \u201CDovbush,\u201D \u201C20 Days in Mariupol,\u201D as well as special screenings of \u201CThe Guide,\u201D \u201CCarol of the Bells,\u201D \u201CViddana,\u201D \u201CStop-Zemlia,\u201D \u201CTerykony,\u201D \u201CThe Earth Is Blue as an Orange,\u201D \u201CLuxembourg, Luxembourg,\u201D \u201CMy Carpathian Grandfather,\u201D \u201CLiving Fire,\u201D \u201CWe Will Not Fade Away,\u201D \u201CStay Online,\u201D \u201CLa Palissade,\u201D \u201CReflection,\u201D and others.`}
      </P>
      <P>
        <B>{`\u201CCreated in Ukraine,\u201D`}</B>
        {` together with the Ukrainian Cultural Centre at the Embassy of Ukraine in the State of Israel, has held free screenings of Ukrainian films for the Ukrainian community.`}
      </P>
      <P>
        {`It also hosted documentary film screenings as part of the `}
        <B>Docudays UA Traveling International Human Rights Documentary Film Festival.</B>
      </P>
      <P>
        <B>{`\u201CCreated in Ukraine\u201D`}</B>
        {` is the distributor in Israel of the films \u201CTaste of Freedom,\u201D \u201CI, Victory, and Berlin,\u201D \u201CSHTTL,\u201D and \u201CThe Kings of Rap.\u201D`}
      </P>
      <P>
        <B>{`In 2022, \u201CCreated in Ukraine\u201D`}</B>
        {` organised the Ukrainian Film Days in the Jerusalem and Holon Cinematheques.`}
      </P>
      <P>
        We collaborate with all major cinema chains in Israel, Cinematheques, and cultural centres in Israel.
      </P>
      <P last>
        {`In 2024, `}
        <B>{`\u201CCreated in Ukraine\u201D`}</B>
        {` is the founder and organiser of the `}
        <B>Ukraine Aviv Festival of Contemporary Ukrainian Cinema in Israel</B>
        {` (Tel Aviv).`}
      </P>
    </>
  )
}

function BodyHe() {
  return (
    <>
      <P>
        <B>{`\u201CCreated in Ukraine\u201D`}</B>
        {` הביא עשרות סרטים אוקראינים למסכי ישראל. ביניהם בכורות של סרטים בערים שונות ברחבי הארץ, כולל \u201Eמאבקה\u201C, \u201Eפמפיר\u201C, \u201Eדובבוש\u201C, \u201E20 ימים במריופול\u201C, וכן הקרנות מיוחדות של \u201Eהמורה דרך\u201C, \u201Eשיר הפעמונים\u201C, \u201Eוידנה\u201C, \u201Eסטופ-זמליה\u201C, \u201Eטריקוני\u201C, \u201Eהארץ כחולה כמו תפוז\u201C, \u201Eלוקסמבורג, לוקסמבורג\u201C, \u201Eסבא שלי מהקרפטים\u201C, \u201Eאש חיה\u201C, \u201Eלא נדעך\u201C, \u201Eהישאר אונליין\u201C, \u201Eלה פליסד\u201C, \u201Eהשתקפות\u201C ואחרים.`}
      </P>
      <P>
        <B>{`\u201CCreated in Ukraine\u201D`}</B>
        {` יחד עם המרכז התרבותי האוקראיני בשגרירות אוקראינה במדינת ישראל, קיים הקרנות חינם של סרטים אוקראינים עבור הקהילה האוקראינית.`}
      </P>
      <P>
        {`כמו כן, נערכו הקרנות של סרטים תיעודיים במסגרת `}
        <B>פסטיבל הסרטים התיעודיים הבינלאומי הנודד לזכויות אדם</B>
        {` Docudays UA.`}
      </P>
      <P>
        <B>{`\u201CCreated in Ukraine\u201D`}</B>
        {` הוא המפיץ בישראל של הסרטים \u201Eטעם של חירות\u201C, \u201Eאני, פובדה וברלין\u201C, \u201ESHTTL\u201C ו-\u201Eמלכי הראפ\u201C.`}
      </P>
      <P>
        <B>{`בשנת 2022, \u201CCreated in Ukraine\u201D`}</B>
        {` ארגן את ימי הקולנוע האוקראיני בסינמטקים של ירושלים וחולון.`}
      </P>
      <P>
        אנו משתפים פעולה עם כל רשתות הקולנוע הגדולות בישראל, סינמטקים ומרכזים תרבותיים בישראל.
      </P>
      <P last>
        {`בשנת 2024, `}
        <B>{`\u201CCreated in Ukraine\u201D`}</B>
        {` הוא המייסד והמארגן של `}
        <B>Ukraine Aviv פסטיבל לקולנוע אוקראיני עכשווי בישראל</B>
        {` (תל אביב).`}
      </P>
    </>
  )
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <div className="bg-[var(--color-surface)]">
      {/* Section — About Content */}
      <section className="flex flex-col items-center overflow-hidden w-full">
        <div className="flex flex-col items-center max-w-[1600px] w-full overflow-hidden mx-auto md:px-[var(--container-side-paddings)] md:py-[var(--spacing-10)]">
          <div className="bg-[var(--color-background)] flex flex-col gap-[var(--spacing-10)] max-w-[800px] w-full pb-[var(--spacing-12)] md:rounded-[32px]">
            {/* Hero Image */}
            <div className="aspect-[21/9] relative w-full overflow-hidden md:rounded-t-[var(--radius-xl)]">
              <img
                src="/images/about-hero.jpg"
                alt={t('title')}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-[var(--spacing-6)] px-[var(--spacing-6)] md:px-[var(--spacing-12)] w-full">
              {/* Title wrapper */}
              <div className="flex flex-col gap-[var(--spacing-2)]">
                <h1 className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[length:var(--text-5xl)] leading-[var(--line-height-5xl)] text-[var(--color-text-primary)]">
                  {t('title')}
                </h1>
                <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-xl)] leading-[var(--line-height-xl)] text-[var(--color-text-secondary)]">
                  kozyrievas@gmail.com
                </p>
              </div>

              {/* Body */}
              <div className="font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-primary)]">
                {locale === 'uk' && <BodyUk />}
                {locale === 'en' && <BodyEn />}
                {locale === 'he' && <BodyHe />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section — Image Grid */}
      <section className="bg-[var(--color-background)] md:bg-transparent w-full">
        <div className="max-w-[1600px] mx-auto overflow-hidden px-[var(--container-side-paddings)] py-[var(--spacing-10)]">
          <ImageGrid />
        </div>
      </section>
    </div>
  )
}
