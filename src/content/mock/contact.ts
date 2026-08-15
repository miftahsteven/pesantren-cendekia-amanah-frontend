import { ContactInfo } from '@/types';

export const contactInfo: ContactInfo = {
  address: {
    street: 'Jl. Raya Kalimulya No. 86B',
    district: 'Kalimulya, Kec. Cilodong',
    city: 'Kota Depok',
    province: 'Jawa Barat',
    postalCode: '16413',
    fullText: 'Jl. Raya Kalimulya No. 86B, Kalimulya, Kec. Cilodong, Kota Depok, Jawa Barat 16413',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.8872504260275!2d106.82914197475225!3d-6.408544993582181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eb96ef6a15e9%3A0xe7448880629ec816!2sPesantren%20Cendekia%20Amanah!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
    mapsLink: 'https://maps.google.com/?q=Pesantren+Cendekia+Amanah+Depok'
  },
  phone: '+62-857-7644-6468',
  email: 'info@cendekiaamanah.sch.id',
  workingHours: 'Senin – Sabtu, 07.30 – 15.30 WIB',
  whatsappUnits: [
    {
      unitName: 'Pesantren & Diniyah',
      number: '6285776446468',
      formattedNumber: '+62 857-7644-6468',
      link: 'https://wa.me/6285776446468?text=Halo%20Admin%20Pesantren%20Cendekia%20Amanah%2C%20saya%20ingin%20bertanya%20seputar%20pendaftaran'
    },
    {
      unitName: 'SMP Cendekia Amanah',
      number: '6285183368851',
      formattedNumber: '+62 851-8336-8851',
      link: 'https://wa.me/6285183368851?text=Halo%20Admin%20SMP%20Cendekia%20Amanah%2C%20saya%20ingin%20bertanya%20seputar%20pendaftaran'
    },
    {
      unitName: 'SMA Cendekia Amanah',
      number: '6285888663587',
      formattedNumber: '+62 858-8866-3587',
      link: 'https://wa.me/6285888663587?text=Halo%20Admin%20SMA%20Cendekia%20Amanah%2C%20saya%20ingin%20bertanya%20seputar%20pendaftaran'
    }
  ]
};
