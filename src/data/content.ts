import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

export const appSections = [
  {
    icon: TrackChangesRoundedIcon,
    title: 'Choose a daily focus',
    text: 'Start with one simple goal for the day: energy, sleep, stress, hydration, fitness, mood, or balance.',
  },
  {
    icon: DashboardRoundedIcon,
    title: 'See your lifestyle signals',
    text: 'KronosVera turns your inputs into a clear overview of habits that may support or hurt your wellbeing.',
  },
  {
    icon: PsychologyRoundedIcon,
    title: 'Read simple explanations',
    text: 'The AI overview explains patterns in plain language, without medical claims or complicated language.',
  },
  {
    icon: NotificationsActiveRoundedIcon,
    title: 'Receive small reminders',
    text: 'Notifications are designed to be supportive, short, and realistic — not scary, guilty, or dramatic.',
  },
];

export const screenshots = [
  { title: 'Dashboard', image: '/images/dashboard.png', text: 'A quick view of current wellness signals, scores, and daily direction.' },
  { title: 'Lifestyle Setup', image: '/images/lifestyle-setup.png', text: 'Simple inputs for sleep, activity, hydration, nutrition, stress, mood, sugar, and work-life balance.' },
  { title: 'AI Overview', image: '/images/ai-overview.png', text: 'Concise awareness-focused explanations based on the user’s lifestyle snapshot.' },
  { title: 'Insights', image: '/images/insights.png', text: 'Trends and patterns that help users understand where small changes may matter.' },
  { title: 'Quick Views', image: '/images/quick-views.png', text: 'Fast access to the parts of the app that matter during the day.' },
];

export const principles = [
  { icon: FavoriteRoundedIcon, title: 'Not a medical app', text: 'KronosVera does not provide diagnosis, treatment, or medical advice.' },
  { icon: InsightsRoundedIcon, title: 'Awareness first', text: 'The goal is to help users notice patterns and think more carefully about daily choices.' },
  { icon: TrackChangesRoundedIcon, title: 'You against you', text: 'Every day is a small fight with yesterday’s version of yourself.' },
];
