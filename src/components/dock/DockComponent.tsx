
import React from 'react'
import { Dock, DockIcon } from '../magicui/dock'
import {House, Wrench, Contact, Headset, BookMarked, AlignHorizontalSpaceAround} from "lucide-react"

export const DockComponent = () => {
  return (
    <div className="relative z-20">
      <Dock iconDistance={80} className='fixed right-0 left-0' iconMagnification={60}>
        <DockIcon className='item1' magnification={60}>
          <a href="#header-section" className='block size-full'>
            <House className='i1 text-red-600' />
          </a>
        </DockIcon>
        <AlignHorizontalSpaceAround className='text-gray-700' />
        <DockIcon className='item2'>
          <a href="#skill-section" className='block size-full'>
          <Wrench className='size-full i2 text-blue-700' />
          </a>
        </DockIcon>
        <DockIcon className='item3'>
          <a href="#courses-section" className='block size-full'>
          <Contact className='size-full i3 text-amber-700'/>
          </a>
        </DockIcon>
        <DockIcon className='item4'>
          <a href="#about-section" className='block size-full'>
          <BookMarked className='size-full i4 text-slate-700' />
          </a>
        </DockIcon>
        <DockIcon className='item5'>
          <a href="#contact-section" className='block size-full'>
          <Headset className='size-full i5 text-green-700' />
          </a>
        </DockIcon>
      </Dock>
    </div>
  )
}

