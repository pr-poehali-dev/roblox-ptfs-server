import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface UserProfile {
  name: string;
  rank: string;
  level: number;
  experience: number;
  maxExperience: number;
  flightHours: number;
  completedFlights: number;
  avatar: string;
  discord: string;
  status: "online" | "offline" | "flying";
}

interface FlightPlan {
  id: string;
  callsign: string;
  departure: string;
  arrival: string;
  aircraft: string;
  route: string;
  altitude: string;
  status: "pending" | "approved" | "active" | "completed";
  submittedBy: string;
  submittedAt: string;
}

interface ATISData {
  airport: string;
  information: string;
  weather: string;
  visibility: string;
  runway: string;
  frequency: string;
  lastUpdated: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user] = useState<UserProfile>({
    name: "Капитан Алексей",
    rank: "Старший пилот",
    level: 25,
    experience: 8750,
    maxExperience: 10000,
    flightHours: 342,
    completedFlights: 127,
    avatar: "/placeholder.svg",
    discord: "AlexPilot#1234",
    status: "online",
  });

  const [flightPlans] = useState<FlightPlan[]>([
    {
      id: "FP001",
      callsign: "AFL001",
      departure: "UUDD",
      arrival: "ULLI",
      aircraft: "Boeing 737-800",
      route: "UUDD DCT BOBRO DCT ULLI",
      altitude: "FL350",
      status: "approved",
      submittedBy: "Капитан Алексей",
      submittedAt: "2024-01-15 14:30",
    },
    {
      id: "FP002",
      callsign: "SU1234",
      departure: "UUEE",
      arrival: "UUDD",
      aircraft: "Airbus A320",
      route: "UUEE DCT MONOL DCT UUDD",
      altitude: "FL370",
      status: "pending",
      submittedBy: "Пилот Дмитрий",
      submittedAt: "2024-01-15 15:45",
    },
  ]);

  const [atisData] = useState<ATISData[]>([
    {
      airport: "UUDD - Домодедово",
      information: "ALPHA",
      weather: "Ясно, ветер 250/15",
      visibility: "10+ км",
      runway: "В работе ВПП 14L/32R",
      frequency: "118.100",
      lastUpdated: "15:30 UTC",
    },
    {
      airport: "UUEE - Шереметьево",
      information: "BRAVO",
      weather: "Облачно, ветер 280/12",
      visibility: "8 км",
      runway: "В работе ВПП 24L/06R",
      frequency: "119.100",
      lastUpdated: "15:25 UTC",
    },
  ]);

  const getRankColor = (rank: string) => {
    const rankMap: { [key: string]: string } = {
      Администратор: "bg-red-600",
      "Старший пилот": "bg-blue-600",
      Пилот: "bg-green-600",
      УВД: "bg-purple-600",
      Стажёр: "bg-yellow-600",
    };
    return rankMap[rank] || "bg-gray-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "flying":
        return "bg-blue-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getFlightStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "status-active";
      case "pending":
        return "status-pending";
      case "active":
        return "status-active";
      case "completed":
        return "bg-gray-600 text-white";
      default:
        return "status-offline";
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated starfield background */}
      <div className="starfield"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-white font-orbitron">
            PTFS AVIATION SERVER
          </h1>
          <p className="text-xl text-blue-300 font-light">
            Профессиональный авиационный симулятор • Система управления полётами
          </p>
        </div>

        {/* User Profile Section */}
        <Card className="aviation-card mb-8 animate-scale-in">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-blue-600 text-white font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`}
                ></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <Badge className={`${getRankColor(user.rank)} text-white`}>
                    {user.rank}
                  </Badge>
                </div>
                <p className="text-blue-300">Discord: {user.discord}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-gray-300">
                    Уровень {user.level}
                  </span>
                  <div className="flex-1 max-w-xs">
                    <Progress
                      value={(user.experience / user.maxExperience) * 100}
                      className="h-2"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    {user.experience}/{user.maxExperience} XP
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-accent">
                  {user.flightHours}
                </div>
                <div className="text-sm text-gray-300">часов полёта</div>
                <div className="text-lg font-semibold text-white mt-1">
                  {user.completedFlights}
                </div>
                <div className="text-sm text-gray-300">завершённых рейсов</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Icon name="Gauge" size={18} />
              Панель
            </TabsTrigger>
            <TabsTrigger value="flights" className="flex items-center gap-2">
              <Icon name="Plane" size={18} />
              Полёты
            </TabsTrigger>
            <TabsTrigger value="atis" className="flex items-center gap-2">
              <Icon name="Radio" size={18} />
              АТИС
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <Icon name="GraduationCap" size={18} />
              Экзамены
            </TabsTrigger>
            <TabsTrigger value="discord" className="flex items-center gap-2">
              <Icon name="MessageCircle" size={18} />
              Discord
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="aviation-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="TrendingUp" size={20} />
                    Статистика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Всего полётов:</span>
                      <span className="text-white font-bold">
                        {user.completedFlights}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Налёт часов:</span>
                      <span className="text-white font-bold">
                        {user.flightHours}ч
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Рейтинг:</span>
                      <span className="text-accent font-bold">★★★★☆</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="aviation-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Clock" size={20} />
                    Последние полёты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-semibold">AFL001</p>
                        <p className="text-sm text-gray-300">UUDD → ULLI</p>
                      </div>
                      <Badge className="status-active">Завершён</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-semibold">SU1234</p>
                        <p className="text-sm text-gray-300">UUEE → UUDD</p>
                      </div>
                      <Badge className="status-pending">В полёте</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="aviation-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Users" size={20} />
                    Онлайн пилоты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-white">Капитан Алексей</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-white">Пилот Дмитрий</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-white">УВД Максим</span>
                    </div>
                    <Separator />
                    <div className="text-center">
                      <p className="text-sm text-gray-300">
                        Всего онлайн:{" "}
                        <span className="text-white font-bold">12</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Flight Plans Tab */}
          <TabsContent value="flights" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Планы полётов</h2>
              <Button className="bg-accent hover:bg-accent/90 text-black font-semibold">
                <Icon name="Plus" size={18} className="mr-2" />
                Новый план
              </Button>
            </div>

            <div className="grid gap-4">
              {flightPlans.map((plan) => (
                <Card key={plan.id} className="aviation-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Icon name="Plane" size={20} />
                          {plan.callsign}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {plan.departure} → {plan.arrival} • {plan.aircraft}
                        </CardDescription>
                      </div>
                      <Badge className={getFlightStatusColor(plan.status)}>
                        {plan.status === "approved" && "Утверждён"}
                        {plan.status === "pending" && "На рассмотрении"}
                        {plan.status === "active" && "Активный"}
                        {plan.status === "completed" && "Завершён"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-300">Маршрут:</p>
                        <p className="text-white font-mono">{plan.route}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Эшелон:</p>
                        <p className="text-white font-mono">{plan.altitude}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Пилот:</p>
                        <p className="text-white">{plan.submittedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Подан:</p>
                        <p className="text-white">{plan.submittedAt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ATIS Tab */}
          <TabsContent value="atis" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">АТИС Информация</h2>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-300 hover:bg-blue-500/10"
              >
                <Icon name="RefreshCw" size={18} className="mr-2" />
                Обновить
              </Button>
            </div>

            <div className="grid gap-4">
              {atisData.map((atis, index) => (
                <Card key={index} className="aviation-card">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Icon name="RadioTower" size={20} />
                      {atis.airport}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Информация {atis.information} • Частота {atis.frequency}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-300">Погода:</p>
                        <p className="text-white">{atis.weather}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Видимость:</p>
                        <p className="text-white">{atis.visibility}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">ВПП:</p>
                        <p className="text-white">{atis.runway}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Обновлено:</p>
                        <p className="text-white">{atis.lastUpdated}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Система экзаменов
              </h2>
              <Button className="bg-accent hover:bg-accent/90 text-black font-semibold">
                <Icon name="BookOpen" size={18} className="mr-2" />
                Пройти экзамен
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="aviation-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Plane" size={20} />
                    Экзамен пилота
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Теоретический экзамен для получения лицензии пилота
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Вопросов:</span>
                      <span className="text-white">50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Время:</span>
                      <span className="text-white">60 минут</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Проходной балл:</span>
                      <span className="text-white">80%</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-gray-300">Статус:</span>
                      <Badge className="status-active">Пройден</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="aviation-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="RadioTower" size={20} />
                    Экзамен УВД
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Экзамен для получения лицензии диспетчера УВД
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Вопросов:</span>
                      <span className="text-white">40</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Время:</span>
                      <span className="text-white">45 минут</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Проходной балл:</span>
                      <span className="text-white">85%</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-gray-300">Статус:</span>
                      <Badge className="status-pending">Доступен</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Discord Tab */}
          <TabsContent value="discord" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Интеграция с Discord
              </h2>
              <p className="text-gray-300 mb-6">
                Подключите свой Discord аккаунт для получения уведомлений и
                участия в экзаменах
              </p>
            </div>

            <Card className="aviation-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  Настройки Discord
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">
                        Статус подключения
                      </p>
                      <p className="text-gray-300">Discord: {user.discord}</p>
                    </div>
                    <Badge className="status-active">Подключён</Badge>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      Настройки уведомлений
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                          Уведомления о полётах
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-400"
                        >
                          Включено
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Экзамены и тесты</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-400"
                        >
                          Включено
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                          Системные сообщения
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-400"
                        >
                          Включено
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-center">
                    <Button className="bg-accent hover:bg-accent/90 text-black font-semibold">
                      <Icon name="Settings" size={18} className="mr-2" />
                      Настроить Discord бота
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
