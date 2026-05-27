import { Geist, Geist_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import CinematicBackground from "@/components/CinematicBackground";
import AudioAuraBackdrop from "@/components/AudioAuraBackdrop";
import AmbientEffects from "@/components/AmbientEffects";
import CursorGlow from "@/components/CursorGlow";
import EdgePulse from "@/components/EdgePulse";
import MusicVisualizer from "@/components/MusicVisualizer";
import WelcomeGate from "@/components/WelcomeGate";
import InquiryRedirectPortal from "@/components/InquiryRedirectPortal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Raj H Chavda | LORD ANOS VOLDIGOAD",
  description: "Premium AAA-level cinematic portfolio for thumbnail design, poster artwork, visual editing, and creator branding.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="bg-background-void text-cream min-h-screen relative overflow-x-hidden selection:bg-gold selection:text-background-void">
        {/* Cinematic Backdrop & Premium Atmosphere */}
        <CinematicBackground />
        
        {/* Noise Texture Overlay - Refined Grain (High-Performance) */}
        <svg className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.04] mix-blend-overlay">
          <filter id="noise">
            <feTurbulence baseFrequency="0.75" numOctaves="1" stitchTiles="stitch" type="fractalNoise" />
          </filter>
          <rect filter="url(#noise)" height="100%" width="100%" />
        </svg>

        {/* High-Intensity Music Sync Layers */}
        <AudioAuraBackdrop />
        <AmbientEffects />
        <CursorGlow />
        <EdgePulse />
        <MusicVisualizer />

        <Navbar />
        <WelcomeGate />
        <InquiryRedirectPortal />

        {/* Smooth Scroll Content */}
        <SmoothScroll>
          <div className="relative z-10 min-h-screen flex flex-col justify-between paper-texture">
            <PageTransition>{children}</PageTransition>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
