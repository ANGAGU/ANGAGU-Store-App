using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using UnityEngine.Networking;

public class AssetBundleLoader : MonoBehaviour
{
    // Start is called before the first frame update

    private string modelName = "testModel/minute";
    public static bool loading;
    private GameObject daeObject;
    GameObject modelObject;
    void Start()
    {
        loading = false;
    }
    // Update is called once per frame
    IEnumerator GetBundle() {
        loading = true;
        UnityMessageManager.Instance.SendMessageToRN("http://d3u3zwu9bmcdht.cloudfront.net/" + MessageURL.url);
        UnityWebRequest www = UnityWebRequestAssetBundle.GetAssetBundle("http://d3u3zwu9bmcdht.cloudfront.net/" + MessageURL.url);

        // www.downloadHandler = new DownloadHandlerBuffer();
        yield return www.SendWebRequest();
        Debug.Log("http://d3u3zwu9bmcdht.cloudfront.net/" + MessageURL.url);
        
        if (www.result != UnityWebRequest.Result.Success)
        {
            // UnityMessageManager.Instance.SendMessageToRN(www);
            Debug.Log(www.error);
        }
        else
        {
            AssetBundle assetFile = DownloadHandlerAssetBundle.GetContent(www);
            if (assetFile == null)
            {
                UnityMessageManager.Instance.SendMessageToRN("Asset Load Error");
                Debug.Log("Asset Load Error");
            }
            AssetBundleRequest prefab = assetFile.LoadAssetAsync(MessageURL.name);
            
            yield return prefab;
            
            assetFile.Unload(false);
            www.Dispose();
            modelObject = prefab.asset as GameObject;
            
        }


        /**** init for .dae file ****/
        // if (daeObject != null)
        //     Destroy(daeObject.transform.GetChild(0).gameObject);

        daeObject = Instantiate(modelObject);
        // 태그 설정을 위해선 해당 태그 이름을 먼저 만들어 줘야한다.
        // 만약 동적인 tag가 필요하다면 editor script가 필요하다.
        daeObject.transform.tag = "Model";

        // destroy camera object in .dae
        
        daeObject.AddComponent<sizeInit>();
        
    }
    void Update()
    {
        if (MessageURL.url != "" && loading == false){            
            loading = true;
            
            UnityMessageManager.Instance.SendMessageToRN(MessageURL.url + " " + MessageURL.name + " " + loading);
            StartCoroutine(GetBundle());
        } 
    }
}
