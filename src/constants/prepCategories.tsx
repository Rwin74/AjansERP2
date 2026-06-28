import React from 'react';
import { Building, Globe, Server, Cloud, MonitorDot, UploadCloud, GitBranch, Box, Search, BarChart2, Target, MapPin, Tag, Share2, Mail, Key } from 'lucide-react';

export const CATEGORIES = [
  { id: 'firma', title: 'Firma Bilgileri', icon: <Building size={18} />, fields: ['Firma Adı', 'Yetkili', 'Telefon', 'WhatsApp', 'E-Posta', 'Adres', 'Vergi No', 'Vergi Dairesi', 'Sektör', 'Notlar'] },
  { id: 'domain', title: 'Domain', icon: <Globe size={18} />, fields: ['Domain', 'Registrar', 'Domain Bitiş Tarihi', 'DNS Sağlayıcısı', 'Nameserver', 'Whois Gizli mi', 'Domain Hesabı Maili', 'Kullanıcı Adı', 'Şifre', 'API Key', 'Notlar'] },
  { id: 'hosting', title: 'Hosting', icon: <Server size={18} />, fields: ['Hosting Firması', 'Paket', 'IP', 'Disk', 'RAM', 'cPanel Linki', 'SSH', 'FTP', 'Hosting Hesabı Maili', 'Kullanıcı', 'Şifre', 'Hosting Bitiş Tarihi', 'Notlar'] },
  { id: 'cloudflare', title: 'Cloudflare', icon: <Cloud size={18} />, fields: ['Hesap Maili', 'Zone', 'API Token', 'SSL Durumu', 'Proxy Durumu', 'Notlar'] },
  { id: 'wordpress', title: 'WordPress', icon: <MonitorDot size={18} />, fields: ['Admin URL', 'Kullanıcı', 'Şifre', 'Tema', 'Builder', 'Lisanslar', 'Notlar'] },
  { id: 'ftp', title: 'FTP', icon: <UploadCloud size={18} />, fields: ['Host', 'Port', 'Kullanıcı', 'Şifre'] },
  { id: 'github', title: 'Github', icon: <GitBranch size={18} />, fields: ['Repository', 'Owner', 'Branch', 'Deploy'] },
  { id: 'vercel', title: 'Vercel', icon: <Box size={18} />, fields: ['Team', 'Project', 'Production URL', 'Mail'] },
  { id: 'gsc', title: 'Search Console', icon: <Search size={18} />, fields: ['Property', 'Mail', 'Doğrulandı mı', 'API Bağlandı mı'] },
  { id: 'analytics', title: 'Google Analytics', icon: <BarChart2 size={18} />, fields: ['Property ID', 'Mail', 'API Bağlandı mı'] },
  { id: 'ads', title: 'Google Ads', icon: <Target size={18} />, fields: ['Customer ID', 'Manager Account', 'Mail', 'Conversion Kurulu mu', 'Tag Kurulu mu', 'Günlük Bütçe'] },
  { id: 'gmb', title: 'Google Business Profile', icon: <MapPin size={18} />, fields: ['Profil Adı', 'Mail', 'Telefon', 'Doğrulandı mı', 'Yönetici Sayısı'] },
  { id: 'gtm', title: 'Google Tag Manager', icon: <Tag size={18} />, fields: ['Container ID', 'Mail', 'Kurulu mu'] },
  { id: 'meta', title: 'Meta Business', icon: <Share2 size={18} />, fields: ['Business Manager', 'Pixel ID', 'Facebook', 'Instagram'] },
  { id: 'mail', title: 'Kurumsal Mail', icon: <Mail size={18} />, fields: ['Mail Sağlayıcısı', 'SMTP', 'IMAP', 'POP3', 'Mail Kullanıcıları'] },
  { id: 'licenses', title: 'Lisanslar', icon: <Key size={18} />, fields: ['Elementor', 'RankMath', 'LiteSpeed', 'WP Rocket', 'Diğer Lisanslar'] },
];
