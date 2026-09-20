import {
  Globe, Award, Users, Clock, BarChart3, CheckCircle2, Layers, Shield, Zap,
  MonitorPlay, Database, Smartphone, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe, Award, Users, Clock, BarChart3, CheckCircle2, Layers, Shield, Zap,
  MonitorPlay, Database, Smartphone,
};

export function getIcon(name: string | undefined | null): LucideIcon {
  return (name && iconMap[name]) || Globe;
}
