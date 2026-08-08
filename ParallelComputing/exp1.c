#include <stdio.h>
#include <stdlib.h>
#include <omp.h>
#include <time.h>

#define MAX 10

void merge(int arr[], int l, int m, int r) {
    int i = l;      // Left subarray pointer
    int j = m + 1;  // Right subarray pointer
    int k = l;      // Temp array pointer
    int *temp = (int *)malloc(sizeof(int) * (r + 1));
    
    while (i <= m && j <= r) {
        if (arr[i] <= arr[j])
            temp[k++] = arr[i++];
        else
            temp[k++] = arr[j++];
    }

    // Copy remaining elements of left half
    while (i <= m)
        temp[k++] = arr[i++];

    // Copy remaining elements of right half
    while (j <= r)
        temp[k++] = arr[j++];

    // Copy back to original array
    for (i = l; i <= r; i++)
        arr[i] = temp[i];
}

void sequentialMergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        sequentialMergeSort(arr, l, m);
        sequentialMergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void parallel_Mergesort(int arr_copy[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;

        #pragma omp parallel sections
        {
            #pragma omp section
            parallel_Mergesort(arr_copy, l, m);

            #pragma omp section
            parallel_Mergesort(arr_copy, m + 1, r);
        }

        merge(arr_copy, l, m, r);
    }
}

int main() {
    int n;
    printf("Enter number of elements: ");
    scanf("%d", &n);

    int *arr = (int *)malloc(n * sizeof(int));
    int *arr_copy = (int *)malloc(n * sizeof(int));

    srand(time(NULL));
    printf(" The original array is....\n");
    for (int i = 0; i < n; i++) {
        arr[i] = rand() % MAX;
        printf("%d ", arr[i]);
    }

    for (int i = 0; i < n; i++)
        arr_copy[i] = arr[i];

    double start, end;

    // Sequential Merge Sort
    start = omp_get_wtime();
    sequentialMergeSort(arr, 0, n - 1);
    end = omp_get_wtime();
    printf("\nSequential MergeSort Time: %f seconds\n", end - start);
    printf("\nSorted Array using Sequential Processing is... \n");

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    // Parallel Merge Sort
    start = omp_get_wtime();
    parallel_Mergesort(arr_copy, 0, n - 1);
    end = omp_get_wtime();
    printf("\nParallel MergeSort Time: %f seconds\n", end - start);
    printf("\nSorted Array using Parallel using Threads Processing is... \n");

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    free(arr);
    free(arr_copy);
    return 0;
}