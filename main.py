from tkinter import S
import pygame
import random
pygame.init()

surface = pygame.display.set_mode((550, 550))

size = 20
color = (255,255,255)
running = True
squareGroups = []
horizontalLines = []
verticalLines = []
horizontalDone = False
verticalDone = False

pygame.draw.rect(surface, color, pygame.Rect(25, 25, (size - 1 ) * 25, 2))
pygame.draw.rect(surface, color, pygame.Rect(50, (size*25) + 25, (size - 1) * 25, 2))
pygame.draw.rect(surface, color, pygame.Rect(25, 25, 2, size*25))
pygame.draw.rect(surface, color, pygame.Rect((size*25) + 25, 25, 2, size*25))

for x in range(size*size):
    squareGroups.append(str(x))

for x in range(size*(size-1)):
    horizontalLines.append(True)
    verticalLines.append(True)

def deleteOne():
    global horizontalDone, verticalDone, size, squareGroups, horizontalLines, verticalLines
    sidePicked = random.randrange(0, 2)
    if(horizontalDone):
        sidePicked = 1
    if(verticalDone):
        sidePicked = 0
    if(horizontalDone & verticalDone):
        sidePicked = 2
    if(sidePicked == 0):
        currentIndexes = []
        for x in range(len(horizontalLines)):
            if(horizontalLines[x] == True):
                currentIndexes.append(x)
        currentChoice = random.choice(currentIndexes)
        for i in range(len(currentIndexes)):
            thisRow = 0
            thisColumn = 0
            for x in range(size):
                if((currentChoice) - (size*(x + 1)) < 0):
                    thisRow = x
                    thisColumn = currentChoice - size*x
                    break
            if(squareGroups[(thisRow*size) + thisColumn] == squareGroups[((thisRow+1)*size) + thisColumn]):
                currentIndexes.remove(currentChoice)
                if(len(currentIndexes) == 0):
                    horizontalDone = True
                    break
                else:
                    currentChoice = random.choice(currentIndexes)
            else:
                #print("horizontal" + str(currentChoice) + " " + str(squareGroups[(thisRow*size) + thisColumn]) + " " + str(squareGroups[((thisRow+1)*size) + thisColumn]))
                horizontalLines[currentChoice] = False
                changingIndexes = []
                for x in range(len(squareGroups)):
                    if(squareGroups[x] == squareGroups[((thisRow+1)*size) + thisColumn]):
                        changingIndexes.append(x)
                # = squareGroups[(thisRow*size) + thisColumn]
                for x in range(len(changingIndexes)):
                    squareGroups[changingIndexes[x]] = squareGroups[(thisRow*size) + thisColumn]
                break
    elif(sidePicked == 1):
        currentIndexes = []
        for x in range(len(verticalLines)):
            if(verticalLines[x] == True):
                currentIndexes.append(x)
        currentChoice = random.choice(currentIndexes)
        for i in range(len(currentIndexes)):
            thisRow = 0
            thisColumn = 0
            for x in range(size):
                if((currentChoice) - ((size-1)*(x + 1)) < 0):
                    thisRow = x
                    thisColumn = currentChoice - ((size-1)*x)
                    break
            if(squareGroups[(thisRow*size) + thisColumn] == squareGroups[(thisRow*size) + thisColumn + 1]):
                currentIndexes.remove(currentChoice)
                if(len(currentIndexes) == 0):
                    verticalDone = True
                    break
                else:
                    currentChoice = random.choice(currentIndexes)
            else:
                #print("vertical" + str(currentChoice) + " " + str(squareGroups[(thisRow*size) + thisColumn]) + " " + str(squareGroups[(thisRow*size) + thisColumn + 1]))
                verticalLines[currentChoice] = False
                changingIndexes = []
                for x in range(len(squareGroups)):
                    if(squareGroups[x] == squareGroups[(thisRow*size) + thisColumn + 1]):
                        changingIndexes.append(x)
                # = squareGroups[(thisRow*size) + thisColumn]
                for x in range(len(changingIndexes)):
                    squareGroups[changingIndexes[x]] = squareGroups[(thisRow*size) + thisColumn]
                break

while horizontalDone == False & verticalDone == False:
    deleteOne()

for y in range(size-1):
    for x in range(size):
        if(horizontalLines[y*size + x] == True):
            pygame.draw.rect(surface, color, pygame.Rect((x*25) + 25, (y*25) + 50, 25, 2))
for y in range(size):
    for x in range(size-1):
        if(verticalLines[y*(size-1) + x] == True):
            pygame.draw.rect(surface, color, pygame.Rect((x*25) + 50, (y*25) + 25, 2, 25))

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    #pygame.draw.rect(surface, color, pygame.Rect(x, y, width, length))
    pygame.display.update()
pygame.quit()