using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class sizeInit : MonoBehaviour
{
    [SerializeField]
    private GameObject originModel;

    public static bool loading;
    // Start is called before the first frame update
    void Start()
    {
        loading = false;

    }

    // Update is called once per frame
    void Update()
    {
        

        if (MessageURL.w != "-1" && loading == false)
        {
            loading = true;

            Vector3 temp = new Vector3(float.Parse(MessageURL.w) / 100.0f, float.Parse(MessageURL.h) / 100.0f, float.Parse(MessageURL.d) / 100.0f);
            resizing(temp);
        }
    }
    //void OnDrawGizmosSelected()
    //{
    //    Bounds totalBounds = new Bounds();
    //    foreach (MeshRenderer meshRenderer in GetComponentsInChildren<MeshRenderer>())
    //    {
    //        totalBounds.Encapsulate(meshRenderer.bounds);
    //    }
    //    Color temp = Color.red;
    //    temp.a = 0.3f;
    //    Gizmos.color = temp;
    //    Gizmos.DrawCube(totalBounds.center, totalBounds.size);
    //}
    void resizing(Vector3 realSize)
    {
        originModel = GameObject.FindWithTag("OriginModel");
        Bounds totalBounds = new Bounds();
        foreach (MeshRenderer meshRenderer in GetComponentsInChildren<MeshRenderer>())
        {
            totalBounds.Encapsulate(meshRenderer.bounds);
        }
        Debug.Log(totalBounds.size);

        Vector3 boundSize = totalBounds.size;

        float resizeRate = realSize.x / boundSize.x;
        transform.localScale = new Vector3(resizeRate, resizeRate, resizeRate);
        /*** 그림자 크기 및 모델 실제 사이즈 체크 ***/
        originModel.transform.localScale = new Vector3(resizeRate, resizeRate, resizeRate);
        originModel.transform.position = realSize;
    }
    
}
