import { AppSidebar } from "@/components/user/AppSideBar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { PhoneOverviewChart } from "@/components/user/charts/PhoneOverviewChart"
import { NotReadyStackedBarChart } from "@/components/user/charts/NotReadyStackedBarChart"
import { AnsweredCallsStackedBarChart } from "@/components/user/charts/AnsweredCallsStackedBarChart"
import { StackedAreaChart } from "@/components/user/charts/StackedAreaChart"
import { MovingCards } from "@/components/user/MovingCards"
import { CaseCensusStackedArea } from "@/components/user/charts/CaseCensusStackedArea"
const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
const sortedAnswerCallsAvg = {
  title: "Top Answered Call % By Month",
  months: [
    {
      month: 'Jul-24',
      data: 87.75,

    },
    {
      month: 'Oct-24',
      data: 87.22,
    },
    {
      month: 'Aug-24',
      data: 86.56,
    },
    {
      month: 'Sep-24',
      data: 83.61,
    },
    {
      month: 'May-24',
      data: 77.11,
    },
    {
      month: 'Jun-24',
      data: 76.5,
    },
    {
      month: 'Mar-24',
      data: 76.01,
    },
    {
      month: 'Apr-24',
      data: 75.77,
    },
    {
      month: 'Jan-24',
      data: 74.67,
    },
    {
      month: 'Feb-24',
      data: 73.72,
    }
  ]
}
const sortedNotReadyAvg = {
  title: "Lowest Not Ready % By Month",
  months: [
    {
      month: 'Jun-24',
      data: 22.31,

    },
    {
      month: 'Mar-24',
      data: 22.41,

    },
    {
      month: 'Feb-24',
      data: 22.61,

    },
    {
      month: 'May-24',

      data: 22.89,

    },
    {
      month: 'Jul-24',
      data: 25.25,
    },
    {
      month: 'Apr-24',
      data: 25.61,
    },
    {
      month: 'Oct-24',
      data: 27,
    },
    {
      month: 'Jan-24',
      data: 27.16,
    },
    {
      month: 'Aug-24',
      data: 27.16,
    },
    {
      month: 'Sep-24',
      data: 27.64,
    }
  ]
}
const sortedAbsencesAvg = {
  title: "Least Absences By Month",
  months: [
    {
      month: 'Jan-24',
      data: 23,

    },
    {
      month: 'Aug-24',
      data: 24,

    },
    {
      month: 'Feb-24',
      data: 31,

    },
    {
      month: 'May-24',
      data: 35,

    },
    {
      month: 'Mar-24',
      data: 36,

    },
    {
      month: 'Oct-24',
      data: 36,

    },
    {
      month: 'Sep-24',

      data: 37,

    },
    {
      month: 'Jul-24',
      data: 38,
    },
    {
      month: 'Jun-24',
      data: 39,

    },
    {
      month: 'Apr-24',
      data: 43,

    }
  ]
}
const sortedTardiesAvg = {
  title: "Least Tardies By Month",
  months: [
    {
      month: 'Aug-24',
      data: 40
    },
    {
      month: 'Sep-24',
      data: 46
    },
    {
      month: 'Mar-24',
      data: 52
    },
    {
      month: 'May-24',
      data: 63
    },
    {
      month: 'Jun-24',
      data: 66
    },
    {
      month: 'Jan-24',
      data: 71
    },
    {
      month: 'Apr-24',
      data: 83
    },
    {
      month: 'Feb-24',
      data: 87
    },
    {
      month: 'Oct-24',
      data: 90
    },
    {
      month: 'Jul-24',
      data: 104
    }

  ]
}

const allCards = [
  {
    title: "Answered Call % By Month",
    months: [
      {
        month: 'Jul-24',
        data: 87.75,

      },
      {
        month: 'Oct-24',
        data: 87.22,
      },
      {
        month: 'Aug-24',
        data: 86.56,
      },
      {
        month: 'Sep-24',
        data: 83.61,
      },
      {
        month: 'May-24',
        data: 77.11,
      },
      {
        month: 'Jun-24',
        data: 76.5,
      },
      {
        month: 'Mar-24',
        data: 76.01,
      },
      {
        month: 'Apr-24',
        data: 75.77,
      },
      {
        month: 'Jan-24',
        data: 74.67,
      },
      {
        month: 'Feb-24',
        data: 73.72,
      }
    ],
    caption: "A High Answered Call % corresponds to more answered calls."
  },
  {
    title: "Not Ready % By Month",
    months: [
      {
        month: 'Jun-24',
        data: 22.31,

      },
      {
        month: 'Mar-24',
        data: 22.41,

      },
      {
        month: 'Feb-24',
        data: 22.61,

      },
      {
        month: 'May-24',

        data: 22.89,

      },
      {
        month: 'Jul-24',
        data: 25.25,
      },
      {
        month: 'Apr-24',
        data: 25.61,
      },
      {
        month: 'Oct-24',
        data: 27,
      },
      {
        month: 'Jan-24',
        data: 27.16,
      },
      {
        month: 'Aug-24',
        data: 27.16,
      },
      {
        month: 'Sep-24',
        data: 27.64,
      }
    ],
    caption: "A Low Not Ready % corresponds to more users answering calls."
  },
  {
    title: "Absences By Month",
    months: [
      {
        month: 'Jan-24',
        data: 23,

      },
      {
        month: 'Aug-24',
        data: 24,

      },
      {
        month: 'Feb-24',
        data: 31,

      },
      {
        month: 'May-24',
        data: 35,

      },
      {
        month: 'Mar-24',
        data: 36,

      },
      {
        month: 'Oct-24',
        data: 36,

      },
      {
        month: 'Sep-24',

        data: 37,

      },
      {
        month: 'Jul-24',
        data: 38,
      },
      {
        month: 'Jun-24',
        data: 39,

      },
      {
        month: 'Apr-24',
        data: 43,

      }
    ],
    caption: "Total absences per month"
  },
  {
    title: "Tardies By Month",
    months: [
      {
        month: 'Aug-24',
        data: 40
      },
      {
        month: 'Sep-24',
        data: 46
      },
      {
        month: 'Mar-24',
        data: 52
      },
      {
        month: 'May-24',
        data: 63
      },
      {
        month: 'Jun-24',
        data: 66
      },
      {
        month: 'Jan-24',
        data: 71
      },
      {
        month: 'Apr-24',
        data: 83
      },
      {
        month: 'Feb-24',
        data: 87
      },
      {
        month: 'Oct-24',
        data: 90
      },
      {
        month: 'Jul-24',
        data: 104
      }

    ],
    caption: "Total tardies per month"
  }
]
export default function Page() {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Overview
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {/* Large Overview Chart of Answered % and Not Ready % */}
            <div className="col-span-full">
              <PhoneOverviewChart />
            </div>
            <div className="col-span-2">
              <NotReadyStackedBarChart />
            </div>
            <div className="col-span-2">
              <AnsweredCallsStackedBarChart />
            </div>
            <div className="col-span-full">
              <CaseCensusStackedArea />
            </div>
            <div className="col-span-full">
              <StackedAreaChart />
            </div>
            <div className="col-span-full mt-4">
              <MovingCards
                items={allCards}
                direction="right"
                speed="slow"
              />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
