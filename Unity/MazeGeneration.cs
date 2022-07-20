using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MazeGeneration : MonoBehaviour {
    public int size = 5;
    List<string> squareGroups = new List<string>();
    List<bool> horizontalLines = new List<bool>();
    List<bool> verticalLines = new List<bool>();
    public bool horizontalDone = false;
    public bool verticalDone = false;

    public GameObject horizontalRect;
    public GameObject verticalRect;

    public bool alreadySpawned = false;
    public float timesLeft = 200f;

    private void Update(){
        if(horizontalDone && verticalDone && !alreadySpawned){
            alreadySpawned = true;
            //Debug.Log("Horizontal " +string.Join(" ", horizontalLines.ToArray()));
            //Debug.Log("Vertical " +string.Join(" ", verticalLines.ToArray()));
            for(int y = 0; y<size-1; y++){
                for(int x = 0; x<size; x++){
                    if(horizontalLines[y*size + x] == true){
                        //pygame.draw.rect(surface, color, pygame.Rect((x*25) + 25, (y*25) + 50, 25, 2))
                        Instantiate(horizontalRect, new Vector3((x*1) + 0.5f, -1f*((y*1) + 1), 0), Quaternion.identity);
                    }
                }
            }
            for(int y = 0; y<size; y++){
                for(int x = 0; x<size-1; x++){
                    if(verticalLines[y*(size-1) + x] == true){
                        //pygame.draw.rect(surface, color, pygame.Rect((x*25) + 50, (y*25) + 25, 2, 25))
                        Instantiate(verticalRect, new Vector3((x*1) + 1f, -1f*(y*1 + 0.5f), 0), Quaternion.identity);
                    }
                }
            }
            for(int x = 0; x<size-1; x++){
                Instantiate(horizontalRect, new Vector3((x*1) + 0.5f, 0, 0), Quaternion.identity);
            }
            for(int x = 1; x<size; x++){
                Instantiate(horizontalRect, new Vector3((x*1) + 0.5f, (size*-1) - 0, 0), Quaternion.identity);
            }
            for(int y = 0; y<size; y++){
                Instantiate(verticalRect, new Vector3(0, (y*-1) - 0.5f, 0), Quaternion.identity);
            }
            for(int y = 0; y<size; y++){
                Instantiate(verticalRect, new Vector3((size)*1 + 0, (y*-1) - 0.5f, 0), Quaternion.identity);
            }
        }
    }

    public void Start(){
        for(int x = 0; x < size*size; x++){
            squareGroups.Add(x.ToString());
        }
        for(int x = 0; x < size*(size-1); x++){
            horizontalLines.Add(true);
            verticalLines.Add(true);
        }

        Invoke("deleteOne", 2f);
    }

    void deleteOne(){
        int sidePicked = Random.Range(0, 2);
        if(horizontalDone){
            sidePicked = 1;
        }
        if(verticalDone){
            sidePicked = 0;
        }
        if(horizontalDone & verticalDone){
            sidePicked = 2;
        }
        if(sidePicked == 0){
            List<int> currentIndexes = new List<int>();
            for(int x = 0; x<horizontalLines.Count; x++){
                if(horizontalLines[x] == true){
                    currentIndexes.Add(x);
                }
            }
            int index = Random.Range(0, currentIndexes.Count);
            int currentChoice = currentIndexes[index];
            int indexesLength = currentIndexes.Count;
            for(int i = 0; i<indexesLength; i++){
                int thisRow = 0;
                int thisColumn = 0;
                for(int x = 0; x < size; x++){
                    if((currentChoice) - (size*(x + 1)) < 0){
                        thisRow = x;
                        thisColumn = currentChoice - size*x;
                        break;
                    }
                }
                if(squareGroups[(thisRow*size) + thisColumn] == squareGroups[((thisRow+1)*size) + thisColumn]){
                    //Debug.Log("horizontal same");
                    //Debug.Log("Horizontal before " +string.Join(" ", currentIndexes.ToArray()));
                    currentIndexes.Remove(currentChoice);
                    //Debug.Log("Horizontal after " +string.Join(" ", currentIndexes.ToArray()));
                    //Debug.Log(currentIndexes.Count);
                    if(currentIndexes.Count == 0){
                        horizontalDone = true;
                        break;
                    }else{
                        int index1 = Random.Range(0, currentIndexes.Count);
                        currentChoice = currentIndexes[index1];
                    }
                }else{
                    //Debug.Log("horizontal different");
                    //print("horizontal" + str(currentChoice) + " " + str(squareGroups[(thisRow*size) + thisColumn]) + " " + str(squareGroups[((thisRow+1)*size) + thisColumn]))
                    horizontalLines[currentChoice] = false;
                    List<int> changingIndexes = new List<int>();
                    for(int x = 0; x<squareGroups.Count; x++){
                        if(squareGroups[x] == squareGroups[((thisRow+1)*size) + thisColumn]){
                            changingIndexes.Add(x);
                        }
                    }
                    // = squareGroups[(thisRow*size) + thisColumn]
                    for(int x = 0; x<changingIndexes.Count; x++){
                        squareGroups[changingIndexes[x]] = squareGroups[(thisRow*size) + thisColumn];
                    }
                    break;
                }
            }
        }else if(sidePicked == 1){
            List<int> currentIndexes = new List<int>();
            for(int x = 0; x<verticalLines.Count; x++){
                if(verticalLines[x] == true){
                    currentIndexes.Add(x);
                }
            }
            int index = Random.Range(0, currentIndexes.Count);
            int currentChoice = currentIndexes[index];
            int indexesLength = currentIndexes.Count;
            for(int i = 0; i<indexesLength; i++){
                int thisRow = 0;
                int thisColumn = 0;
                for(int x = 0; x < size; x++){
                    if((currentChoice) - ((size-1)*(x + 1)) < 0){
                        thisRow = x;
                        thisColumn = currentChoice - ((size-1)*x);
                        break;
                    }
                }
                if(squareGroups[(thisRow*size) + thisColumn] == squareGroups[(thisRow*size) + thisColumn + 1]){
                    //Debug.Log("vertical same");
                    //Debug.Log("Vertical before " + string.Join(" ", currentIndexes.ToArray()));
                    currentIndexes.Remove(currentChoice);
                    //Debug.Log("Vertical after " + string.Join(" ", currentIndexes.ToArray()));
                    //Debug.Log(currentIndexes.Count);
                    if(currentIndexes.Count == 0){
                        verticalDone = true;
                        break;
                    }else{
                        int index1 = Random.Range(0, currentIndexes.Count);
                        currentChoice = currentIndexes[index1];
                    }
                }else{
                    //Debug.Log("vertical different");
                    //print("vertical" + str(currentChoice) + " " + str(squareGroups[(thisRow*size) + thisColumn]) + " " + str(squareGroups[(thisRow*size) + thisColumn + 1]))
                    verticalLines[currentChoice] = false;
                    List<int> changingIndexes = new List<int>();
                    for(int x = 0; x<squareGroups.Count; x++){
                        if(squareGroups[x] == squareGroups[(thisRow*size) + thisColumn + 1]){
                            changingIndexes.Add(x);
                        }
                    }
                    // = squareGroups[(thisRow*size) + thisColumn]
                    for(int x = 0; x<changingIndexes.Count; x++){
                        squareGroups[changingIndexes[x]] = squareGroups[(thisRow*size) + thisColumn];
                    }
                    break;
                } 
            }
        }

        if(horizontalDone != true || verticalDone != true){
            deleteOne();
        }
        // if(timesLeft>0f){
        //     timesLeft-=1f;
        //     deleteOne();
        // }
    }
}
