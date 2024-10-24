import React, { useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Collapsible } from '@/components/Collapsible'
import { Colors } from '@/constants/Colors'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import SearchFAQ from '@/components/SearchFAQ'

const faqs = [
  {
    id: '0',
    name: 'What is HairHarmony?',
    description:
      'HairHarmony is a management solution designed for hair salons to streamline operations and enhance customer satisfaction. It allows customers to book appointments, provide feedback, and earn rewards, while salon owners and staff can manage bookings, track earnings, and handle commissions.'
  },
  {
    id: '1',
    name: 'How can I access HairHarmony?',
    description:
      'HairHarmony is accessible via both web and mobile applications, offering users flexibility in booking appointments and managing their salon experience on the go.'
  },
  {
    id: '2',
    name: 'How do I book an appointment?',
    description:
      "Customers can browse available services, choose their preferred hair stylist, and book appointments directly through the web or mobile app. It's quick and easy to manage your salon visit."
  },
  {
    id: '3',
    name: 'How can salon staff manage appointments?',
    description:
      'Salon staff can view, manage, approve, or reject appointment requests through the app, as well as track the status of services to ensure smooth operations.'
  },
  {
    id: '4',
    name: 'Can I provide feedback on my service experience?',
    description:
      'Yes, after each appointment, customers can provide feedback on their experience through the app. Your input helps improve service quality and contributes to the overall salon experience.'
  },
  {
    id: '5',
    name: 'What are loyalty points and rewards?',
    description:
      'Customers can earn loyalty points for regular use of salon services. These points can be accumulated and redeemed for rewards, encouraging engagement and repeat business.'
  },
  {
    id: '6',
    name: 'How can salon owners track earnings?',
    description:
      'Salon owners have access to a dedicated dashboard to track earnings from services provided and manage financial transactions effectively, ensuring smooth business operations.'
  },
  {
    id: '7',
    name: 'How does commission and salary management work for stylists?',
    description:
      'Stylists receive a fixed monthly salary and earn a percentage commission on the revenue generated from the services they provide. Payments are processed at the end of each month.'
  },
  {
    id: '8',
    name: 'What kind of support does HairHarmony offer?',
    description:
      'HairHarmony provides assistance for appointment-related issues, service inquiries, and technical problems. Users can report issues, request help, and expect quick resolutions through the system.'
  },
  {
    id: '9',
    name: 'Is my data secure on HairHarmony?',
    description:
      'Yes, HairHarmony implements robust data security measures to protect user information. IT administrators ensure secure platform operations, and the system integrates with third-party services for payments and notifications.'
  },
  {
    id: '10',
    name: 'Can I reschedule or cancel my appointment?',
    description:
      'Yes, customers can reschedule or cancel their appointments through the app. Please make sure to check the salon’s cancellation policy, as fees may apply for late cancellations.'
  },
  {
    id: '11',
    name: 'How do I know if my appointment is confirmed?',
    description:
      'Once you book an appointment, you will receive a confirmation notification via the app. Salon staff may also approve or reject the request, and you will be notified of the final status.'
  },
  {
    id: '12',
    name: 'Can I choose my preferred stylist for an appointment?',
    description:
      'Yes, HairHarmony allows customers to browse through available stylists and choose the one they prefer based on their specialties and availability.'
  },
  {
    id: '13',
    name: 'What should I do if I encounter a technical issue?',
    description:
      'If you experience any technical issues with the app, you can reach out to our support team through the in-app support feature. We are here to help resolve any problems as quickly as possible.'
  },
  {
    id: '14',
    name: 'How do I earn and redeem loyalty points?',
    description:
      'Loyalty points are earned by regularly using the salon’s services and providing feedback. You can redeem these points for special discounts or free services through the app.'
  },
  {
    id: '15',
    name: 'What services can I book through the app?',
    description:
      "The HairHarmony app allows customers to book various salon services such as haircuts, styling, coloring, treatments, and more. The available services will depend on each salon's offerings."
  },
  {
    id: '16',
    name: 'Can I see my booking history?',
    description:
      'Yes, HairHarmony allows users to view their booking history, including past appointments, services used, and feedback provided. This helps you keep track of your salon visits.'
  },
  {
    id: '17',
    name: 'Is there a fee for using the HairHarmony app?',
    description:
      'The app is free to download and use for customers. However, service charges and appointment fees are handled by the individual salons based on the services you select.'
  },
  {
    id: '18',
    name: 'How do salon owners manage staff schedules?',
    description:
      'Salon owners can easily manage staff schedules through the app by assigning stylists to shifts, tracking their availability, and ensuring that appointments are balanced across the team.'
  }
]

const Faq = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [filteredFaqs, setFilteredFaqs] = useState(faqs)
  const router = useRouter()
  const clearSearchValue = () => {
    setSearchValue('')
    setIsSearch(false)
  }
  const onChangeText = (text: string) => {
    setSearchValue(text)
    text !== '' ? setIsSearch(true) : setIsSearch(false)
  }
  const handleSearch = () => {
    if (searchValue.trim()) {
      const filtered = faqs.filter(
        (faq) =>
          faq.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          faq.description.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredFaqs(filtered)
    } else {
      // If search query is empty, reset the filtered FAQs to the full list
      setFilteredFaqs(faqs)
    }
    setIsSearch(false) // You can modify this to control the search input display
  }
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '', dark: '' }}>
      <ThemedView className='px-3'>
        <ThemedView>
          <ThemedText type='subtitle' className='mt-3 mb-2'>
            We’re here to help you with anything and everything on HairHarmony
          </ThemedText>
          <ThemedText className='my-2' lightColor={Colors.light.subText} darkColor={Colors.dark.subText}>
            At HairHarmony we expect at a day’s start is you, better and happier than yesterday. We have got you covered
            share your concern or check our frequently asked questions listed below.
          </ThemedText>
        </ThemedView>
        {/* Search bar */}
        <ThemedView className='my-3' style={{ position: 'relative', zIndex: 100 }}>
          <SearchFAQ
            clearSearchValue={clearSearchValue}
            handleSearch={handleSearch}
            isSearch={isSearch}
            onChangeText={onChangeText}
            value={searchValue}
          />
        </ThemedView>
        {/* Faq List */}
        <ThemedView>
          <ThemedText type='subtitle' className='mb-3'>
            FAQ
          </ThemedText>
          {filteredFaqs.map((faq) => (
            <>
              <ThemedView
                className='w-full'
                style={styles.divider}
                lightColor={Colors.light.tabIconDefault}
                darkColor={Colors.dark.tabIconDefault}
              ></ThemedView>
              <ThemedView className='py-3'>
                <Collapsible key={faq.id} title={faq.name}>
                  <ThemedText>{faq.description}</ThemedText>
                </Collapsible>
              </ThemedView>
            </>
          ))}
          <ThemedView
            className='w-full'
            style={styles.divider}
            lightColor={Colors.light.tabIconDefault}
            darkColor={Colors.dark.tabIconDefault}
          ></ThemedView>
        </ThemedView>
        {/* contact */}
        <ThemedView className='mb-2 mt-4'>
          <ThemedText type='subtitle' className='text-center my-2'>
            Still stuck? Help us a mail away.
          </ThemedText>
          <TouchableOpacity onPress={() => router.push('/contact')}>
            <ThemedView
              lightColor={Colors.light.button}
              darkColor={Colors.dark.button}
              className='py-2 px-4 w-full rounded-full items-center justify-center'
            >
              <ThemedText
                type='defaultSemiBold'
                lightColor={Colors.light.textButton}
                darkColor={Colors.dark.textButton}
              >
                Send a message
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  divider: {
    height: 1
  }
})

export default Faq
