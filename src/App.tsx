import { useState } from "react"
import { AnimatePresence, motion , type Variants} from "framer-motion"

// Giả định bạn đã "thanh tẩy" và chuyển các component này vào thư mục components
import Intro from "./routes/index" // Hoặc Introduction tùy bạn đặt tên
import Projects from "./routes/projects"
import Skills from "./routes/skills"
import Achievements from "./routes/achievements"
import Personal from "./routes/personal"
import Contact from "./routes/contact"
import { Header } from "./components/Header";

import { usePictures } from "./hooks/use-pictures.tsx"

export default function App() {
  const [activeTab, setActiveTab] = useState("intro")
  usePictures();
  // Cấu hình Animation rút thẻ cục súc (Không nảy, trượt nhanh, dứt khoát)
  const cardVariants : Variants = {
    initial: { y: "100%", opacity: 1 },
    animate: { y: 0, opacity: 1, transition: { type: "tween", duration: 0.4, ease: "circOut" } },
    exit: { y: "-100%", opacity: 1, transition: { type: "tween", duration: 0.3, ease: "circIn" } }
  }

  // Map state với component tương ứng
  const renderContent = () => {
    switch (activeTab) {
      case "intro": return <Intro />
      case "projects": return <Projects />
      case "skills": return <Skills />
      case "achievements": return <Achievements />
      case "personal": return <Personal />
      case "contact": return <Contact />
      default: return <Intro />
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-white text-black">
    
    {/* Header vẫn fixed, nằm đè lên trên cùng */}
    <Header activeTab={activeTab} setActiveTab={setActiveTab} />

    {/* Main đóng vai trò là khung chứa nội dung */}
    <main className="relative flex-1 w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex h-full w-full flex-col pt-16 md:pt-20 overflow-y-auto bg-gray-50 scrollbar-hide"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </main>
    
  </div>
  )
}