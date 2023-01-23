library(readxl)
dados <- read_excel("E:/Projetos/arduino/TESTES/server http/18 - MQ135 + LCD + DHT11 + pushbutton/teste01/dados2.xlsx", 
                     col_types = c("numeric", "numeric", "numeric", 
                                   "numeric", "numeric", "numeric"))
View(dados)


library(sqldf)

dados$V3 = NULL

names(dados)[1] <- "Gas"
names(dados)[2] <- "Valor"

boxplot(dados)

plot(dados)


CO = sqldf("SELECT * from dados WHERE V1 = 'CO'")
names(CO)[2] <- "CO"
CO$V1 = NULL

ALCOOL = sqldf("SELECT * from dados WHERE V1 = 'Alcool'")
names(ALCOOL)[2] <- "Alcool"
ALCOOL$V1 = NULL

CO2 = sqldf("SELECT * from dados WHERE V1 = 'CO2'")
names(CO2)[2] <- "CO2"
CO2$V1 = NULL

Tolueno = sqldf("SELECT * from dados WHERE V1 = 'Tolueno'")
names(Tolueno)[2] <- "Tolueno"
Tolueno$V1 = NULL

NH4 = sqldf("SELECT * from dados WHERE V1 = 'NH4'")
names(NH4)[2] <- "NH4"
NH4$V1 = NULL

ACETONA = sqldf("SELECT * from dados WHERE V1= 'Acetona'")
names(ACETONA)[2] <- "Acetona"
ACETONA$V1 = NULL

#UNINDO OS DADOS
dados2 <- bind_cols(CO, CO2, ALCOOL, ACETONA, NH4, Tolueno)

write.xlsx(dados2, file = "dados2.xlsx",
           sheetName = "dados", append = FALSE)

