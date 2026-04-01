import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST() {
  const payload = await getPayload({ config })

  // Check if already seeded
  const existing = await payload.find({ collection: 'movies', limit: 1 })
  if (existing.docs.length > 0) {
    return NextResponse.json({ message: 'Already seeded' })
  }

  // Places
  const yesPlanet = await payload.create({
    collection: 'places',
    data: { name: 'Yes Planet', city: 'Rishon LeZion', address: 'Rothschild Blvd 1', cinemaChain: 'Yes Planet' },
  })
  const cinemacity = await payload.create({
    collection: 'places',
    data: { name: 'Cinema City', city: 'Jerusalem', address: 'Kanfei Nesharim 22', cinemaChain: 'Cinema City' },
  })
  const cinematheque = await payload.create({
    collection: 'places',
    data: { name: 'Tel Aviv Cinematheque', city: 'Tel Aviv', address: "Ha'Arba'a 2", cinemaChain: 'Cinematheque' },
  })
  const hotCinema = await payload.create({
    collection: 'places',
    data: { name: 'HOT Cinema', city: 'Haifa', address: 'Derech HaAtzmaut 45', cinemaChain: 'HOT Cinema' },
  })

  // Movies with localization
  const movie1 = await payload.create({
    collection: 'movies', locale: 'uk',
    data: { title: 'Різдвяний експрес', slug: 'rizdvianyi-ekspres', year: 2024, director: 'Олександр Бережок', duration: 95, genre: ['comedy', 'family'] },
  })
  await payload.update({ collection: 'movies', id: movie1.id, locale: 'en', data: { title: 'Train to Christmas', director: 'Oleksandr Berezhok' } })
  await payload.update({ collection: 'movies', id: movie1.id, locale: 'he', data: { title: 'רכבת לחג המולד', director: 'אולכסנדר ברז\'וק' } })

  const movie2 = await payload.create({
    collection: 'movies', locale: 'uk',
    data: { title: 'Океан Ельзи: Шторм спостерігаємо', slug: 'okean-elzy-storm', year: 2024, director: 'Дмитро Сухолиткий-Собчук', duration: 120, genre: ['documentary'] },
  })
  await payload.update({ collection: 'movies', id: movie2.id, locale: 'en', data: { title: 'Okean Elzy: Storm Observation', director: 'Dmytro Sukholytkyy-Sobchuk' } })
  await payload.update({ collection: 'movies', id: movie2.id, locale: 'he', data: { title: 'אוקיאן אלזי: תצפית סערה', director: 'דמיטרו סוכוליטקי-סובצ\'וק' } })

  const movie3 = await payload.create({
    collection: 'movies', locale: 'uk',
    data: { title: 'Ти — Всесвіт', slug: 'ty-vsesvit', year: 2023, director: 'Павло Островський', duration: 87, genre: ['drama', 'romance'] },
  })
  await payload.update({ collection: 'movies', id: movie3.id, locale: 'en', data: { title: 'U are the Universe', director: 'Pavlo Ostrovskyi' } })
  await payload.update({ collection: 'movies', id: movie3.id, locale: 'he', data: { title: 'את היקום', director: 'פבלו אוסטרובסקי' } })

  const movie4 = await payload.create({
    collection: 'movies', locale: 'uk',
    data: { title: 'Хранителі Різдва', slug: 'khranyteli-rizdva', year: 2024, director: 'Зоя Барановська', duration: 103, genre: ['animation', 'family'] },
  })
  await payload.update({ collection: 'movies', id: movie4.id, locale: 'en', data: { title: 'The Guardians of Christmas', director: 'Zoya Baranovska' } })
  await payload.update({ collection: 'movies', id: movie4.id, locale: 'he', data: { title: 'שומרי חג המולד', director: 'זויה ברנובסקה' } })

  const movie5 = await payload.create({
    collection: 'movies', locale: 'uk',
    data: { title: 'Ла Палісіада', slug: 'la-palisada', year: 2023, director: 'Філіп Сотниченко', duration: 100, genre: ['thriller', 'historical'] },
  })
  await payload.update({ collection: 'movies', id: movie5.id, locale: 'en', data: { title: 'La Palisiada', director: 'Philip Sotnychenko' } })
  await payload.update({ collection: 'movies', id: movie5.id, locale: 'he', data: { title: 'לה פליסדה', director: 'פיליפ סוטניצ\'נקו' } })

  // Screenings
  const futureDate = (days: number, hour: number, min: number) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    d.setHours(hour, min, 0, 0)
    return d.toISOString()
  }

  await payload.create({ collection: 'screenings', data: { movie: movie1.id, place: yesPlanet.id, datetime: futureDate(3, 19, 30), ticketUrl: 'https://example.com/tickets/1', price: '50 ₪' } })
  await payload.create({ collection: 'screenings', data: { movie: movie2.id, place: cinematheque.id, datetime: futureDate(3, 21, 0), ticketUrl: 'https://example.com/tickets/2', price: '60 ₪' } })
  await payload.create({ collection: 'screenings', data: { movie: movie3.id, place: cinemacity.id, datetime: futureDate(5, 20, 0), ticketUrl: 'https://example.com/tickets/3', price: '45 ₪' } })
  await payload.create({ collection: 'screenings', data: { movie: movie4.id, place: hotCinema.id, datetime: futureDate(7, 18, 0), ticketUrl: 'https://example.com/tickets/4', price: '40 ₪' } })
  await payload.create({ collection: 'screenings', data: { movie: movie5.id, place: cinematheque.id, datetime: futureDate(7, 21, 30), ticketUrl: 'https://example.com/tickets/5', price: '55 ₪' } })
  await payload.create({ collection: 'screenings', data: { movie: movie1.id, place: cinemacity.id, datetime: futureDate(10, 19, 0), ticketUrl: 'https://example.com/tickets/6', price: '50 ₪' } })
  await payload.create({ collection: 'screenings', data: { movie: movie3.id, place: yesPlanet.id, datetime: futureDate(14, 20, 30), price: '45 ₪' } })

  // Site Settings
  await payload.updateGlobal({
    slug: 'site-settings', locale: 'uk',
    data: {
      heroTitle: 'Знято в Україні', heroTagline: 'Українське кіно в Ізраїлі',
      socialLinks: { facebook: 'https://www.facebook.com/createdinua', telegram: 'https://t.me/createdinua', instagram: 'https://www.instagram.com/createdinua' },
      stats: [
        { value: '50+', label: 'сучасних українських фільмів' },
        { value: '14', label: 'міст Ізраїлю' },
        { value: '3', label: 'мережі кінотеатрів' },
        { value: '1', label: 'фестиваль' },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings', locale: 'en',
    data: {
      heroTitle: 'Created in Ukraine', heroTagline: 'Ukrainian cinema in Israel',
      stats: [
        { value: '50+', label: 'contemporary Ukrainian films' },
        { value: '14', label: 'Israeli cities' },
        { value: '3', label: 'cinema chains' },
        { value: '1', label: 'festival' },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings', locale: 'he',
    data: {
      heroTitle: 'נוצר באוקראינה', heroTagline: 'קולנוע אוקראיני בישראל',
      stats: [
        { value: '50+', label: 'סרטים אוקראיניים עכשוויים' },
        { value: '14', label: 'ערים בישראל' },
        { value: '3', label: 'רשתות קולנוע' },
        { value: '1', label: 'פסטיבל' },
      ],
    },
  })

  // Announcement
  await payload.updateGlobal({ slug: 'announcement', locale: 'uk', data: { isActive: true, type: 'info', text: 'Ласкаво просимо на оновлений сайт «Знято в Україні»!' } })
  await payload.updateGlobal({ slug: 'announcement', locale: 'en', data: { text: 'Welcome to the updated Created in Ukraine website!' } })
  await payload.updateGlobal({ slug: 'announcement', locale: 'he', data: { text: '!ברוכים הבאים לאתר המעודכן של נוצר באוקראינה' } })

  return NextResponse.json({
    message: 'Seeded successfully',
    data: { places: 4, movies: 5, screenings: 7 },
  })
}
