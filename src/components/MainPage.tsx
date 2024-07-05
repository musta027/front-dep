"use client"

import { useState } from "react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

export function MainPage() {
  const [language, setLanguage] = useState("en")
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
  }

  const scrollToGenerator = () => {
    const element = document.getElementById("try-document-generator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8001/generate_document/', {
          user_input: userInput
      }, {
          responseType: 'blob' // Important to handle binary data
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);

    } catch (error) {
      setError("An error occurred while generating the document.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-16 flex items-center fixed top-0 left-0 right-0 z-10 bg-black text-white">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <FileIcon className="h-6 w-6" />
          <span className="sr-only">tezDet.ai</span>
        </Link>
        <div className="ml-auto flex gap-4 sm:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
              >
                {language === "en"
                  ? "English"
                  : language === "ru"
                  ? "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
                  : "\u049A\u0430\u0437\u0430\u049B\u0448\u0430"}
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("kz")}>Қазақша</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("ru")}>Русский</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {language === "en"
              ? "Sign In"
              : language === "ru"
              ? "\u0412\u043E\u0439\u0442\u0438"
              : "\u041A\u0456\u0440\u0443"}
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {language === "en"
              ? "Sign Up"
              : language === "ru"
              ? "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F"
              : "\u0422\u0456\u0440\u043A\u0435\u043B\u0443"}
          </Link>
        </div>
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-8 md:space-y-12">
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  {language === "en"
                    ? "Create professional documents for any purpose"
                    : language === "ru"
                    ? "\u0421\u043E\u0437\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0434\u043B\u044F \u043B\u044E\u0431\u044B\u0445 \u0446\u0435\u043B\u0435\u0439"
                    : "\u041A\u0435\u0437 \u043A\u0435\u043B\u0433\u0435\u043D \u043C\u0430\u049B\u0441\u0430\u0442 \u04AF\u0448\u0456\u043D \u043A\u04D9\u0441\u0456\u0431\u0438 \u049B\u04B1\u0436\u0430\u0442\u0442\u0430\u0440\u0434\u044B \u0436\u0430\u0441\u0430\u0443"}
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  {language === "en"
                    ? "tezDet.ai makes it easy to create high-quality documents for any purpose."
                    : language === "ru"
                    ? "tezDet.ai упрощает создание высококачественных документов для любых целей."
                    : "tezDet.ai кез келген мақсат үшін жоғары сапалы құжаттарды жасауды оңай етеді."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={scrollToGenerator}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {language === "en"
                      ? "Create Document"
                      : language === "ru"
                      ? "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442"
                      : "\u049A\u04B1\u0436\u0430\u0442 \u0436\u0430\u0441\u0430\u0443"}
                  </Button>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="600"
                height="500"
                alt="Hero"
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        <hr className="border-black my-8" />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 space-y-8 md:space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {language === "en"
                    ? "Powerful capabilities for your needs"
                    : language === "ru"
                    ? "\u041C\u043E\u0449\u043D\u044B\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u0432\u0430\u0448\u0438\u0445 \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u0435\u0439"
                    : "\u0421\u0456\u0437\u0434\u0456\u04A3 \u049B\u0430\u0436\u0435\u0442\u0442\u0456\u043B\u0456\u043A\u0442\u0435\u0440\u0456\u04A3\u0456\u0437 \u04AF\u0448\u0456\u043D \u049B\u0443\u0430\u0442\u0442\u044B \u043C\u04AF\u043C\u043A\u0456\u043D\u0434\u0456\u043A\u0442\u0435\u0440"}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {language === "en"
                    ? "tezDet.ai offers a wide range of capabilities to help you create professionally looking documents."
                    : language === "ru"
                    ? "tezDet.ai предлагает широкий спектр возможностей, чтобы помочь вам создавать профессионально выглядящие документы."
                    : "tezDet.ai кәсіби көрінетін құжаттарды жасауға көмектесетін кең ауқымды мүмкіндіктерді ұсынады."}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-4">
                <div className="bg-primary rounded-md p-4 flex items-center justify-center">
                  <LayoutTemplateIcon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {language === "en"
                      ? "Templates"
                      : language === "ru"
                      ? "\u0428\u0430\u0431\u043B\u043E\u043D\u044B"
                      : "\u04AE\u043B\u0433\u0456\u043B\u0435\u0440"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "en"
                      ? "Choose from pre-designed templates."
                      : language === "ru"
                      ? "\u0412\u044B\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0438\u0437 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u044B\u0445 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432."
                      : "\u0410\u043B\u0434\u044B\u043D \u0430\u043B\u0430 \u0436\u043E\u0431\u0430\u043B\u0430\u043D\u0493\u0430\u043D \u04AF\u043B\u0433\u0456\u043B\u0435\u0440 \u0430\u0440\u0430\u0441\u044B\u043D\u0430\u043D \u0442\u0430\u04A3\u0434\u0430\u04A3\u044B\u0437."}
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="bg-secondary rounded-md p-4 flex items-center justify-center">
                  <FolderInputIcon className="w-8 h-8 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {language === "en"
                      ? "Auto-fill"
                      : language === "ru"
                      ? "\u0410\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435"
                      : "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0442\u044B \u0442\u043E\u043B\u0442\u044B\u0440\u0443"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "en"
                      ? "Automatically fill in document data."
                      : language === "ru"
                      ? "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0437\u0430\u043F\u043E\u043B\u043D\u044F\u0439\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430."
                      : "\u049A\u04B1\u0436\u0430\u0442 \u0434\u0435\u0440\u0435\u043A\u0442\u0435\u0440\u0456\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0442\u044B \u0442\u043E\u043B\u0442\u044B\u0440\u044B\u04A3\u044B\u0437."}
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="bg-accent rounded-md p-4 flex items-center justify-center">
                  <ImportIcon className="w-8 h-8 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {language === "en"
                      ? "Export Options"
                      : language === "ru"
                      ? "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0430"
                      : "\u042D\u043A\u0441\u043F\u043E\u0440\u0442\u0442\u0430\u0443 \u043E\u043F\u0446\u0438\u044F\u043B\u0430\u0440\u044B"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "en"
                      ? "Export your documents in various formats, including PDF."
                      : language === "ru"
                      ? "\u042D\u043A\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0432\u0430\u0448\u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0445 \u0444\u043E\u0440\u043C\u0430\u0442\u0430\u0445, \u0432\u043A\u043B\u044E\u0447\u0430\u044F PDF."
                      : "\u049A\u04B1\u0436\u0430\u0442\u0442\u0430\u0440\u044B\u04A3\u044B\u0437\u0434\u044B PDF \u049B\u043E\u0441\u0430 \u0430\u043B\u0493\u0430\u043D\u0434\u0430, \u04D9\u0440\u0442\u04AF\u0440\u043B\u0456 \u0444\u043E\u0440\u043C\u0430\u0442\u0442\u0430\u0440\u0434\u0430 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0442\u0430\u04A3\u044B\u0437."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-black my-8" />

        <section id="try-document-generator" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 space-y-8 md:space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {language === "en"
                    ? "Try our document generator"
                    : language === "ru"
                    ? "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043D\u0430\u0448 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432"
                    : "\u049A\u04B1\u0436\u0430\u0442 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u044B\u043C\u044B\u0437\u0434\u044B \u0441\u044B\u043D\u0430\u043F \u043A\u04E9\u0440\u0456\u04A3\u0456\u0437"}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {language === "en"
                    ? "You can create PDF templates using our document generator."
                    : language === "ru"
                    ? "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C PDF-\u0448\u0430\u0431\u043B\u043E\u043D\u044B \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043D\u0430\u0448\u0435\u0433\u043E \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432."
                    : "\u0421\u0456\u0437 PDF \u0444\u043E\u0440\u043C\u0430\u0442\u044B\u043D\u0434\u0430\u0493\u044B \u04AF\u043B\u0433\u0456\u043B\u0435\u0440\u0434\u0456 \u049B\u04B1\u0436\u0430\u0442 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u044B\u043C\u044B\u0437 \u0430\u0440\u049B\u044B\u043B\u044B \u0436\u0430\u0441\u0430\u0439 \u0430\u043B\u0430\u0441\u044B\u0437."}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2">
              <div className="space-y-4">
                <Input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={
                    language === "en"
                      ? "Enter your request here..."
                      : language === "ru"
                      ? "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u0437\u0430\u043F\u0440\u043E\u0441 \u0437\u0434\u0435\u0441\u044C..."
                      : "\u0421\u04B1\u0440\u0430\u0443\u044B\u04A3\u044B\u0437\u0434\u044B \u043C\u04B1\u043D\u0434\u0430 \u0435\u043D\u0433\u0456\u0437\u0456\u04A3\u0456\u0437..."
                  }
                  className="w-full"
                />
                <Button onClick={handleGenerate} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  {language === "en"
                    ? "Create Document"
                    : language === "ru"
                    ? "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442"
                    : "\u049A\u04B1\u0436\u0430\u0442 \u0436\u0430\u0441\u0430\u0443"}
                </Button>
              </div>
              <div className="bg-white rounded-md shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  {language === "en"
                    ? "Generated PDF Document"
                    : language === "ru"
                    ? "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 PDF-\u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442"
                    : "\u0416\u0430\u0441\u0430\u043B\u0493\u0430\u043D PDF \u049B\u04B1\u0436\u0430\u0442\u044B"}
                </h3>
                <div className="h-[400px] overflow-auto">
                  {pdfUrl ? (
                    <iframe src={pdfUrl} width="100%" height="100%" />
                  ) : (
                    <p>
                      {language === "en"
                        ? "Your generated PDF document will be displayed here."
                        : language === "ru"
                        ? "\u0412\u0430\u0448 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 PDF-\u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u0437\u0434\u0435\u0441\u044C."
                        : "\u0416\u0430\u0441\u0430\u043B\u0493\u0430\u043D PDF \u049B\u04B1\u0436\u0430\u0442\u044B\u04A3\u044B\u0437 \u043C\u04B1\u043D\u0434\u0430 \u043A\u04E9\u0440\u0441\u0435\u0442\u0456\u043B\u0435\u0434\u0456."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function FolderInputIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
      <path d="M2 13h10" />
      <path d="m9 16 3-3-3-3" />
    </svg>
  )
}


function ImportIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m8 11 4 4 4-4" />
      <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
    </svg>
  )
}


function LayoutTemplateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="7" x="3" y="3" rx="1" />
      <rect width="9" height="7" x="3" y="14" rx="1" />
      <rect width="5" height="7" x="16" y="14" rx="1" />
    </svg>
  )
}
