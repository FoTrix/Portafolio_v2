import { useState } from 'react';
import { DockIcon } from '@/components/magicui/dock';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grip,
  X, 
} from 'lucide-react';
import { Icon } from 'astro-icon/components';

const socialLinks = [
  {
    // TODO: Reemplaza 'YOUR_WHATSAPP_NUMBER' con tu número de WhatsApp (incluyendo código de país, sin '+')
    href: 'https://wa.me/YOUR_WHATSAPP_NUMBER', 
    icon: "logos:whatsapp-icon",
    label: 'WhatsApp',
    color: 'text-green-500',
  },
  {
    // TODO: Reemplaza 'YOUR_GITHUB_USERNAME' con tu nombre de usuario de GitHub
    href: 'https://github.com/YOUR_GITHUB_USERNAME', 
    icon: "fa6-brands:github",
    label: 'GitHub',
    color: 'text-gray-700 dark:text-gray-300',
  },
  {
    // TODO: Reemplaza 'YOUR_LINKEDIN_PROFILE' con tu URL de perfil de LinkedIn
    href: 'https://linkedin.com/in/YOUR_LINKEDIN_PROFILE', 
    icon: "fa6-brands:linkedin",
    label: 'LinkedIn',
    color: 'text-blue-600',
  },
  {
    // TODO: Reemplaza 'YOUR_STACKOVERFLOW_ID' con tu ID de usuario de Stack Overflow
    href: 'https://stackoverflow.com/users/YOUR_STACKOVERFLOW_ID', 
    icon: "logos:stackoverflow-icon",
    label: 'Stack Overflow',
    color: 'text-orange-500 hover:text-orange-600',
  },
  {
    // TODO: Reemplaza 'YOUR_DISCORD_ID' con tu ID de usuario de Discord
    href: 'https://discord.com/users/YOUR_DISCORD_ID', 
    icon: "logos:discord-icon", 
    label: 'Discord',
    color: 'text-indigo-500 hover:text-indigo-600',
  },
];

export const SocialDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <DockIcon magnification={60} onClick={toggleDrawer} className="cursor-pointer">
        <Grip className="text-gray-700 dark:text-gray-300" />
      </DockIcon>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 p-2 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md border border-border dark:border-neutral-700 rounded-lg shadow-lg flex flex-col space-y-1.5 items-center z-10"
            style={{ minWidth: '55px' }}
          >
            {socialLinks.map((link) => {
              const {icon, href, label, color} = link;
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`block p-1.5 rounded-full hover:bg-muted/50 dark:hover:bg-neutral-700/50 transition-colors ${color}`}
                >
                  <Icon name={icon} size="5"/>
                </a>
              );
            })}
            {/* Separator */}
            
            <div className="w-full h-px bg-border dark:bg-neutral-700 my-1"></div>

            <button
              onClick={toggleDrawer}
              aria-label="Cerrar drawer social"
              className="p-1.5 rounded-full text-muted-foreground dark:text-neutral-400 hover:bg-muted/50 dark:hover:bg-neutral-700/50 hover:text-foreground dark:hover:text-neutral-300 transition-colors"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};